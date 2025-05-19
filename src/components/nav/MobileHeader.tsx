import {
  MoonStarIcon,
  PanelLeftOpenIcon,
  SearchIcon,
  TreePineIcon,
  XIcon,
} from "lucide-react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, type PropsWithChildren } from "react";

function MobileDialogWrapper(
  props: PropsWithChildren<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }>
) {
  // Holds transitions to slide in mobile menu and fade-in backdrop
  return (
    <Transition show={props.isOpen}>
      <Dialog onClose={() => props.setIsOpen(false)} className="relative z-50">
        <TransitionChild>
          {/* Backdrop */}
          <div
            className="fixed inset-0 dark:bg-gray-900/30 opacity-100 backdrop-blur-sm trasition-opacity transition ease-in duration-200 data-closed:opacity-0 data-enter:duration-100 data-leave:duration-300"
            aria-hidden="true"
          />
        </TransitionChild>
        <TransitionChild>
          {/* Menu */}
          <div className="fixed inset-0 flex translate-x-0 items-start overflow-y-auto transition ease-in-out data-closed:-translate-x-full data-enter:duration-100 data-leave:duration-300">
            {props.children}
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}

function MobileDialog(props: { onClose: () => void }) {
  function HeaderLink(props: { active: boolean; name: string; to: string }) {
    return (
      <a
        href={props.to}
        className={
          "flex gap-2 items-center px-4 py-2" + props.active
            ? "text-theme-800 dark:text-theme-400"
            : ""
        }
      >
        {props.name}
      </a>
    );
  }

  const navigation = [
    { name: "hi", to: "hi", active: false },
    { name: "active", to: "acti", active: true },
    { name: "test", to: "test", active: false },
  ];

  return (
    <DialogPanel className="min-h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] bg-gray-100 text-gray-800 shadow-2xl transition">
      <DialogTitle className="sr-only">Navigation</DialogTitle>
      <div className="flex min-h-screen flex-col justify-between">
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="size-14 px-4"
            onClick={() => props.onClose()}
          >
            <XIcon className="size-6 text-gray-600" />
          </button>
          <ol className="px-4">
            <span className="font-header font-semibold">On This Page</span>
            <li>
              <a href="#abc">Header One</a>
            </li>
            <li>
              <a href="#abc">Header Two - Longer Header</a>
              <ol className="pl-4 text-gray-600">
                <li>
                  <a href="#abc">Part One</a>
                </li>
                <li>
                  <a href="#abc">Part Two</a>
                </li>
              </ol>
            </li>
            <li>
              <a href="#abc">Header Three</a>
            </li>
          </ol>
          <div className="h-0.5 w-2/3 mx-auto bg-gray-400" />
          <nav className="flex flex-col px-4">
            {navigation.map((nav) => (
              <HeaderLink key={nav.to} {...nav} />
            ))}
          </nav>
        </div>
        <div className="flex flex-col">
          <a
            href="/github"
            className="mx-auto flex items-center gap-1 pb-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <span className="font-mono">__COMMIT_HASH__</span>
          </a>
        </div>
      </div>
    </DialogPanel>
  );
}

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="block md:hidden">
        <div className="flex justify-between p-2">
          <span className="flex gap-2">
            <button
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 p-1.5 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              <PanelLeftOpenIcon />
              <span className="sr-only">Open Sidebar</span>
            </button>
            <a href="/" className="flex items-center gap-1">
              <TreePineIcon className="text-accent-primary" />
              <span className="text-xl font-header font-semibold text-accent-primary">
                SpruceBytes
              </span>
            </a>
          </span>
          <span className="flex gap-4">
            <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 p-1.5 rounded-lg">
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button>
            <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 p-1.5 rounded-lg">
              <MoonStarIcon />
              <span className="sr-only">Toggle Dark Mode</span>
            </button>
          </span>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-emerald-800 to-emerald-500"></div>
      </header>
      <MobileDialogWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
        <MobileDialog onClose={() => setIsOpen(false)} />
      </MobileDialogWrapper>
    </>
  );
}
