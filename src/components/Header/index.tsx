"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Dictionary } from "@/i18n";
import { Locale } from "@/i18n/config";
import { localizeHref, stripLocale } from "@/i18n/paths";
import getMenuData from "./menuData";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
  translatedSlugs: string[];
}

const Header = ({ dict, locale, translatedSlugs }: HeaderProps) => {
  const pathUrl = usePathname();
  const { path: currentPath } = stripLocale(pathUrl);
  const menuData = getMenuData(dict);

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const openSubmenuRef = useRef<HTMLLIElement | null>(null);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // Close the open submenu when the reader clicks anywhere outside it
  // (page content, logo, language switcher) or presses Escape.
  useEffect(() => {
    if (openIndex === -1) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && !openSubmenuRef.current?.contains(target)) {
        setOpenIndex(-1);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(-1);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex]);

  // Navigating away closes it too — the header survives route changes.
  useEffect(() => {
    setOpenIndex(-1);
  }, [pathUrl]);

  const siteName = dict.site.name.toUpperCase();

  // Any navigation closes both the mobile nav and an open submenu.
  const closeMenus = () => {
    setNavbarOpen(false);
    setOpenIndex(-1);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-[999] w-full border-b border-white/15 bg-[#030303]/80 backdrop-blur-[12px]">
        <div className="page-width flex h-[76px] items-center justify-between gap-10">
          <Link
            href={localizeHref("/", locale)}
            className="flex shrink-0 items-center gap-3"
            aria-label={dict.site.name}
          >
            <span className="font-display text-[20px] leading-[0.9] font-extrabold tracking-[-0.015em] text-white sm:text-[26px]">
              {siteName}
            </span>
            <span className="hidden border-l border-white/40 pl-3 text-[9px] leading-[1.4] font-bold tracking-[0.14em] text-white uppercase sm:block">
              {dict.site.tagline}
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              id="navbarCollapse"
              className={`${
                navbarOpen ? "visible opacity-100" : "invisible opacity-0"
              } fixed inset-x-0 top-[76px] bottom-0 z-30 overflow-y-auto bg-[#050505] px-5 py-8 transition-opacity duration-200 lg:visible lg:static lg:flex lg:items-center lg:gap-9 lg:overflow-visible lg:bg-transparent lg:p-0 lg:opacity-100`}
            >
              <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-9">
                {menuData.map((menuItem, index) =>
                  menuItem.path ? (
                    <li key={index} className="relative">
                      <Link
                        onClick={closeMenus}
                        scroll={false}
                        href={localizeHref(menuItem.path, locale)}
                        className={`flex items-center py-3 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-colors lg:py-0 hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-8 ${
                          currentPath === menuItem.path
                            ? "underline decoration-accent decoration-2 underline-offset-8"
                            : ""
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    </li>
                  ) : (
                    <li
                      className="group relative"
                      key={index}
                      ref={openIndex === index ? openSubmenuRef : null}
                    >
                      <button
                        onClick={() => handleSubmenu(index)}
                        aria-expanded={openIndex === index}
                        className="flex w-full items-center justify-between gap-2 py-3 text-[11px] font-bold tracking-[0.14em] text-white uppercase transition-colors hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-8 lg:w-auto lg:py-0"
                      >
                        {menuItem.title}
                        <svg
                          className={`h-3 w-3 transition-transform duration-200 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 11.4 2.6 6.1a.9.9 0 0 1 1.3-1.3L8 8.9l4.1-4.1a.9.9 0 1 1 1.3 1.3L8 11.4Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>

                      <div
                        className={`${
                          openIndex === index ? "block" : "hidden"
                        } mt-1 border-l border-line pl-4 lg:absolute lg:top-full lg:left-0 lg:mt-0 lg:min-w-[280px] lg:border lg:border-line lg:bg-paper-light lg:py-3 lg:pl-0`}
                      >
                        {menuItem?.submenu?.map((submenuItem, i) => (
                          <div key={i}>
                            <Link
                              href={
                                submenuItem.path
                                  ? localizeHref(submenuItem.path, locale)
                                  : "#"
                              }
                              onClick={closeMenus}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                currentPath === submenuItem.path
                                  ? "text-ink"
                                  : "text-muted hover:text-ink"
                              }`}
                            >
                              {submenuItem.title}
                            </Link>
                            {submenuItem.submenu && (
                              <div className="lg:pl-4">
                                {submenuItem.submenu.map((nested, j) => (
                                  <Link
                                    key={j}
                                    href={
                                      nested.path
                                        ? localizeHref(nested.path, locale)
                                        : "#"
                                    }
                                    onClick={closeMenus}
                                    className={`block px-4 py-2 text-[13px] transition-colors ${
                                      currentPath === nested.path
                                        ? "text-ink"
                                        : "text-muted hover:text-ink"
                                    }`}
                                  >
                                    {nested.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <LanguageSwitcher
              locale={locale}
              label={dict.nav.switchTo}
              ariaLabel={dict.nav.languageSwitcher}
              translatedSlugs={translatedSlugs}
              className="inline-flex"
            />

            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label={dict.nav.mobileMenu}
              aria-expanded={navbarOpen}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`block h-0.5 w-[26px] bg-white transition-all duration-300 ${
                  navbarOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-[26px] bg-white transition-all duration-300 ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-[26px] bg-white transition-all duration-300 ${
                  navbarOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
