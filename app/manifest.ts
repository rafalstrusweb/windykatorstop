import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WindykatorStop.pl — Pomoc dla osób zadłużonych",
    short_name: "Windykator Stop",
    description:
      "Bezpłatna pomoc dla osób w pętli zadłużenia. Generator pism, skrypt rozmowy, sprawa EPU, kalkulator przedawnienia.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#0d9488",
    orientation: "portrait",
    lang: "pl",
    categories: ["finance", "education", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Generator Pism",
        short_name: "Pisma",
        description: "Wygeneruj pismo do windykatora",
        url: "/generator-pism",
      },
      {
        name: "Skrypt Rozmowy",
        short_name: "Skrypt",
        description: "Co powiedzieć windykatorowi",
        url: "/skrypt-rozmowy",
      },
      {
        name: "Sprawa EPU",
        short_name: "EPU",
        description: "List z sądu? Masz 14 dni",
        url: "/epu",
      },
    ],
  };
}
