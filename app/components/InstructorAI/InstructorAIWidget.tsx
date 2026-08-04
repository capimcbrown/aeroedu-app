"use client";

import { useState } from "react";
import InstructorButton from "./InstructorButton";
import InstructorDrawer from "./InstructorDrawer";

/**
 * Punto de entrada único del Instructor IA. Se monta una sola vez en
 * app/page.tsx y controla si el panel lateral está abierto o cerrado.
 */
export default function InstructorAIWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InstructorButton onClick={() => setOpen(true)} />
      <InstructorDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
