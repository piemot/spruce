export type Theme = "dark" | "light";

export class ThemeManager {
  static instance: ThemeManager;

  #theme = $state<Theme>("light");
  #overridden = $state(false);

  private constructor() {
    const init = this.getInitial();
    this.#theme = init.theme;
    this.#overridden = init.overridden;

    this.applyTheme(this.#theme);
    this.listenToSystemThemeChanges();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private getInitial(): { theme: Theme; overridden: boolean } {
    const storedTheme = this.getStoredTheme();
    return { theme: storedTheme ?? this.getSystemTheme(), overridden: storedTheme !== null };
  }

  private getStoredTheme(): Theme | null {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return null;
  }

  private getSystemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  private applyTheme(theme: "light" | "dark"): void {
    if (theme === "light") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = "dark";
    }
  }

  public get theme(): "light" | "dark" {
    return this.#theme;
  }

  public get isThemeOverridden(): boolean {
    return this.#overridden;
  }

  public setTheme(newTheme: "light" | "dark"): void {
    const systemTheme = this.getSystemTheme();
    this.#overridden = newTheme !== systemTheme;

    if (this.#overridden) {
      localStorage.setItem("theme", newTheme);
    } else {
      localStorage.removeItem("theme");
    }

    this.#theme = newTheme;
    this.applyTheme(this.#theme);
  }

  private listenToSystemThemeChanges(): void {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!this.#overridden) {
        this.#theme = e.matches ? "dark" : "light";
        this.applyTheme(this.#theme);
      }
    });
  }
}
