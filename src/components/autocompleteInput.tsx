import { useState } from 'react';
import { fruitList } from '../constants/words';

const AutocompleteInput = () => {
  const [results, setResults] = useState<string[]>([]);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query) {
      const newResults = fruitList.filter((item) => item.toLowerCase().startsWith(query.toLowerCase())) || [];
      setResults(newResults);
      return;
    }
    setResults([]);
  }

  return (
    <div>
      <label>Search:
        <input data-testid='input' onInput={handleInput} />
      </label>

      <ol>
        {results && results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default AutocompleteInput;