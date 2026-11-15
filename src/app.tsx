import { Hand } from "./features/hand";

export const App = () => (
  <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4">
    <h1 className="text-3xl font-bold">Bliss</h1>

    <Hand />
  </main>
);

// const extra = () => <button
//         className="rounded-md border px-4 py-2 capitalize"
//         onClick={() => {
//           if (state.value === "playing") {
//             send({ type: "PAUSED" });

//             return;
//           }

//           send({ type: "PLAYED" });
//         }}
//         onDoubleClick={() => {
//           send({ type: "STOPPED" });
//         }}
//         type="button"
//       >
//         {state.value}
//       </button>
//       <div className="flex items-center gap-2">
//         <button
//           className="rounded-md border px-4 py-2 capitalize"
//           onClick={() => {
//             send({ type: "PREVIOUS" });
//           }}
//           type="button"
//         >
//           Previous
//         </button>
//         <p className="text-2xl font-bold">
//           {state.context.tracks[state.context.index]?.title}
//         </p>
//         <button
//           className="rounded-md border px-4 py-2 capitalize"
//           onClick={() => {
//             send({ type: "NEXT" });
//           }}
//           type="button"
//         >
//           Next
//         </button>
//       </div>
