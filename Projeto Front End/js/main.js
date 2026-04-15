document.addEventListener("DOMContentLoaded", () => {
  const itensAnimados = document.querySelectorAll("[data-reveal]");
  if (!itensAnimados.length) {
    return;
  }

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Só pra ajustar as animações pra ficarem mais flíudas
  document.querySelectorAll("[data-stagger]").forEach((grupo) => {
    Array.from(grupo.children).forEach((item, index) => {
      const alvo = item.matches("[data-reveal]") ? item : item.querySelector("[data-reveal]");

      if (!alvo) {
        return;
      }

      alvo.style.setProperty("--delay", `${index * 90}ms`);
    });
  });

  if (prefereMenosMovimento) {
    itensAnimados.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  itensAnimados.forEach((item) => observer.observe(item));
});
