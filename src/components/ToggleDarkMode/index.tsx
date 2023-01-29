import { component$, useClientEffect$, useSignal } from "@builder.io/qwik";
import DarkMode from "@svg/dark_mode.svg";
import LightMode from "@svg/light_mode.svg";

// It needs to be exported in order to be used inside a Qrl($) scope.
export const DARK = "dark";
export const LIGHT = "light";
export const COLOR_THEME = "theme";

export const ToggleDarkMode = component$(() => {
  const isDarkModeEnabled = useSignal<boolean | null>(null);

  useClientEffect$(
    () => {
      if (
        localStorage.theme === DARK ||
        (!(COLOR_THEME in localStorage) && window.matchMedia(`(prefers-color-scheme: ${DARK})`).matches)
      ) {
        document.documentElement.classList.add(DARK);
        isDarkModeEnabled.value = true;
      } else {
        document.documentElement.classList.remove(DARK);
        isDarkModeEnabled.value = false;
      }
    },
    {
      eagerness: "load",
    }
  );

  return (
    <div>
      <button
        type="button"
        preventdefault:click
        onClick$={() => {
          // if set via local storage previously
          if (localStorage.getItem(COLOR_THEME)) {
            if (localStorage.getItem(COLOR_THEME) === LIGHT) {
              document.documentElement.classList.add(DARK);
              localStorage.setItem(COLOR_THEME, DARK);
              isDarkModeEnabled.value = true;
            } else {
              document.documentElement.classList.remove(DARK);
              localStorage.setItem(COLOR_THEME, LIGHT);
              isDarkModeEnabled.value = false;
            }
            // if NOT set via local storage previously
          } else {
            if (document.documentElement.classList.contains(DARK)) {
              document.documentElement.classList.remove(DARK);
              localStorage.setItem(COLOR_THEME, LIGHT);
              isDarkModeEnabled.value = false;
            } else {
              document.documentElement.classList.add(DARK);
              localStorage.setItem(COLOR_THEME, DARK);
              isDarkModeEnabled.value = true;
            }
          }
        }}
      >
        {isDarkModeEnabled.value ? <LightMode /> : <DarkMode />}
      </button>
    </div>
  );
});
