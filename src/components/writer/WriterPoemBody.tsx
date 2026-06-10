type WriterPoemBodyProps = {
  stanzas: string[][];
};

export function WriterPoemBody({ stanzas }: WriterPoemBodyProps) {
  return (
    <div className="writer-poem-body">
      {stanzas.map((stanza, stanzaIndex) => (
        <div key={stanzaIndex} className="writer-poem-stanza">
          {stanza.map((line, lineIndex) => (
            <p key={lineIndex} className="writer-poem-line">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
