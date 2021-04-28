import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { fruitList } from '../constants/words';
import styled from 'styled-components';

const Button = styled('button')`
  border: none;
  background-color: transparent;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const List = styled('ol')`
  display: block;
  margin: 0;
  padding: 0;
  box-shadow: 0px 2px 6px #d2cece;
  max-height: 300px;
  overflow: auto;
`;

const Field = styled('label')`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  border-bottom: solid 2px #00bcd4;
  padding-bottom: 5px;
  padding-top: 5px;
  input {
    font-size: 16px;
    margin-left: 10px;
    border: none;
    padding: 0;
    outline: none;
  }
`

const Item = styled('li')`
  display: block;
  padding: 0px;
  &.highlighted {
    background-color: #e2f3f5;
  }
`;

const AutocompleteInput = () => {
  const [results, setResults] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const highlightedOption = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if (inputValue) {
      const inputValueLowerCase = inputValue.toLowerCase();
      const newResults = fruitList.filter((item) => item.toLowerCase().startsWith(inputValueLowerCase));

      setResults(newResults.length > 1 || newResults[0]?.toLowerCase() !== inputValueLowerCase ? newResults : []);
      return;
    }
    setResults([]);
  }, [inputValue]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);

  useEffect(() => {
    highlightedOption.current?.scrollIntoView({ behavior: 'smooth' });
  }, [highlightedIndex]);

  const handleElementSelection = (event: any) => {
    setInputValue(event.target.textContent);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      highlightedOption.current?.click();
      return;
    }

    if (event.key === 'ArrowDown') {
      const next = highlightedIndex + 1;
      setHighlightedIndex(next === results.length ? 0 : next);
      return;
    }

    if (event.key === 'ArrowUp') {
      const next = highlightedIndex - 1;
      setHighlightedIndex(next < 0 ? -1 : next);
      return;
    }
  }

  return (
    <div>
      <Field>Search:
        <input data-testid='input' onInput={handleInput} value={inputValue} onKeyUp={handleKeyUp} />
      </Field>

      <List>
        {results && results.map((item, index) => {
          let opts: any = [];
          if (highlightedIndex === index) {
              opts['ref'] = highlightedOption;
          }
          return (
            <Item key={index} className={highlightedIndex === index ? 'highlighted' : undefined } >
              <Button onClick={handleElementSelection} {...opts}>{item}</Button>
            </Item>
          )
        })}
      </List>
    </div>
  );
};

export default AutocompleteInput;