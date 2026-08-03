"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
  /** Alt text for the thumbnail image */
  alt?: string;
};

export const LayoutGrid = ({
  cards,
  theme = "dark",
}: {
  cards: Card[];
  /** "dark" (default) for use on dark backgrounds, "light" for light sections. */
  theme?: "dark" | "light";
}) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  // Tile colors flip with the section background so the cards sit
  // properly on either ink-950 (dark) or cream (light) sections.
  const cardBg = theme === "light" ? "bg-ink-100" : "bg-ink-900";
  const cardRing = theme === "light"
    ? "ring-1 ring-ink-950/10"
    : "ring-1 ring-cream/10";

  return (
    <div className="relative w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4">
      {cards.map((card, i) => {
        // True when some card is expanded but THIS card isn't the
        // selected one — used to dim + blur the background tiles so the
        // expanded card reads as the focus.
        const isBlurredBg =
          selected !== null && selected.id !== card.id;

        return (
        <div
          key={i}
          className={cn(
            card.className,
            "min-h-72 md:min-h-80 transition-all duration-500 group",
            isBlurredBg && "blur-md scale-[0.96] opacity-60"
          )}
        >
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer transition-all duration-500",
              selected?.id === card.id
                ? "rounded-lg absolute inset-0 h-auto max-h-[85vh] w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col overflow-hidden ring-0"
                : lastSelected?.id === card.id
                ? `z-40 ${cardBg} rounded-xl w-full h-full`
                : `${cardBg} ${cardRing} rounded-xl w-full h-full hover:ring-2 hover:ring-accent/60`
            )}
            layoutId={`card-${card.id}`}
          >
            {/* Selected state — render content + dim overlay */}
            {selected?.id === card.id && (
              <SelectedCard selected={selected} handleClose={handleOutsideClick} />
            )}
            <ImageComponent card={card} />
          </motion.div>
        </div>
        );
      })}
      {/* Backdrop that closes the modal when clicked. Kept light so
          the blurred background cards still read through. */}
      <AnimatePresence>
        {selected?.id && (
          <motion.div
            onClick={handleOutsideClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute h-full w-full left-0 top-0 bg-ink-950/40 z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      alt={card.alt ?? "Case study thumbnail"}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
      )}
    />
  );
};

const SelectedCard = ({
  selected,
  handleClose,
}: {
  selected: Card | null;
  handleClose: () => void;
}) => {
  return (
    <div
      onClick={handleClose}
      className="bg-transparent h-full w-full flex flex-col rounded-lg shadow-2xl relative z-[60] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        className="absolute inset-0 h-full w-full bg-black z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        // Stop click propagation so the parent close-on-click handler
        // doesn't fire when the user clicks content inside the modal.
        onClick={(e) => e.stopPropagation()}
        className="relative px-6 md:px-10 py-6 md:py-8 z-[70] mt-auto overflow-y-auto max-h-[85vh]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};