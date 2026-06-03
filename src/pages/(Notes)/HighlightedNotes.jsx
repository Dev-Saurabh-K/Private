// function HighlightedNotes({ text = "", words = [] }) {
//   const regex = new RegExp(`(${words.join("|")})`, "gi");

//   return (
//     <>
//       {text.split(regex).map((part, index) =>
//         words.some(
//           (word) =>
//             word?.toLowerCase() === part?.toLowerCase()
//         ) ? (
//           <span key={index} className="text-red-500">
//             {part}
//           </span>
//         ) : (
//           part
//         )
//       )}
//     </>
//   );
// }

// export default HighlightedNotes;
function HighlightedNotes({ text = "", words = [] }) {
  const escapedWords = words.map(word =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const regex = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");

  return (
    <>
      {text.split(regex).map((part, index) =>
        words.some(
          (word) => word?.toLowerCase() === part?.toLowerCase()
        ) ? (
          <span key={index} className="text-red-500">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default HighlightedNotes;