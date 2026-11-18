(function () {
  "use strict";

  var root = document.body.dataset.root || "./";
  var base = new URL(root, location.href);

  function url(path) {
    return new URL(path, base).toString();
  }

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slug(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.dataset.copy);
      if (!target) return;
      var text = target.textContent || "";
      var done = function () {
        var original = button.textContent;
        button.textContent = "Copied";
        setTimeout(function () {
          button.textContent = original;
        }, 1300);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register(url("sw.js"), { scope: base.pathname })
        .catch(function () {});
    });
  }

  var input = document.getElementById("search-input");
  if (input) initSearch();

  async function initSearch() {
    var results = document.getElementById("search-results");
    var status = document.getElementById("search-status");
    var documents = [];

    try {
      var response = await fetch(url("api/v1/search-index.json"));
      if (!response.ok) throw new Error("HTTP " + response.status);
      documents = (await response.json()).documents || [];
    } catch (error) {
      status.textContent = "Could not load the search index. Are you offline without a cache?";
      return;
    }

    var params = new URLSearchParams(location.search);
    var activeTag = params.get("tag");
    var initial = params.get("q") || "";
    if (initial) input.value = initial;

    if (activeTag) {
      var tagged = documents.filter(function (doc) {
        return doc.tags.some(function (tag) {
          return slug(tag) === activeTag;
        });
      });
      var label = tagged.length
        ? tagged[0].tags.filter(function (tag) {
            return slug(tag) === activeTag;
          })[0]
        : activeTag;
      render(tagged, "Tagged “" + label + "”: " + tagged.length + " card(s).");
      return;
    }

    function run() {
      var query = input.value.trim().toLowerCase();
      if (!query) {
        results.innerHTML = "";
        status.textContent = "Type to search " + documents.length + " cards.";
        return;
      }

      var terms = query.split(/\s+/).filter(Boolean);
      var matches = [];

      documents.forEach(function (doc) {
        var title = doc.title.toLowerCase();
        var tags = doc.tags.join(" ").toLowerCase();
        var text = doc.text.toLowerCase();
        var score = 0;
        var all = true;

        terms.forEach(function (term) {
          var hit = false;
          if (title.indexOf(term) !== -1) {
            score += 12;
            hit = true;
          }
          if (tags.indexOf(term) !== -1) {
            score += 6;
            hit = true;
          }
          var index = text.indexOf(term);
          if (index !== -1) {
            score += 2;
            hit = true;
          }
          if (!hit) all = false;
        });

        if (!all) return;
        if (title === query) score += 20;
        matches.push({ doc: doc, score: score, term: terms[0] });
      });

      matches.sort(function (a, b) {
        return b.score - a.score || a.doc.title.localeCompare(b.doc.title);
      });

      render(
        matches.slice(0, 60).map(function (item) {
          return item.doc;
        }),
        matches.length + " result(s) for “" + input.value.trim() + "”.",
      );
    }

    function render(list, label) {
      status.textContent = label;
      results.innerHTML = list
        .map(function (doc) {
          return (
            '<li><a class="card-title" href="' +
            esc(url(doc.url)) +
            '">' +
            esc(doc.title) +
            '</a><p class="snippet">' +
            esc(snippet(doc.text, input.value.trim())) +
            '</p><ul class="tags">' +
            doc.tags
              .map(function (tag) {
                return (
                  '<li><a class="tag" href="' +
                  esc(url("search/?tag=" + encodeURIComponent(slug(tag)))) +
                  '">' +
                  esc(tag) +
                  "</a></li>"
                );
              })
              .join("") +
            "</ul></li>"
          );
        })
        .join("");
    }

    function snippet(text, query) {
      var lower = text.toLowerCase();
      var term = query.toLowerCase().split(/\s+/)[0] || "";
      var index = term ? lower.indexOf(term) : -1;
      var start = index > 60 ? index - 60 : 0;
      var piece = text.slice(start, start + 180);
      return (start > 0 ? "…" : "") + piece + (start + 180 < text.length ? "…" : "");
    }

    var timer;
    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(run, 110);
    });

    run();
  }
})();
