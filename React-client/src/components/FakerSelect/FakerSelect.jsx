import React, { useState } from 'react';
import useComponentVisible from '../../hooks/ComponentVisible';
import {faker} from './fakerList';

const filterObj = (searchText, list) => {
  if (!searchText) {
    return list;
  }
  return list.value.filter((element) => element.includes(searchText));
};

const FakerSelect = () => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [valueSelect, setValueSelect] = useState('Template');
  const [searchField, setSearchField] = useState('');

  return (
    <div className="SelectMock-wrapper">
      <div className="SelectMock-container__inputField">
        <div
          onClick={() =>
            setIsComponentVisible(
              (isComponentVisible) => (isComponentVisible = !isComponentVisible),
            )
          }
          className="SelectMock-inputField">
          <div className="SelectMock-text">{valueSelect}</div>
          <div className="SelectMock-button">
            <img src="/image/dropdown-arrow.svg" />
          </div>
        </div>
        {isComponentVisible ? (
          <div ref={ref} className="SelectMock-container__dropdown">
            <div className="SelectMock-list">
              <div className=" SelectMock-search">
                <input
                  type="text"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <img src="/image/search-magnifier.svg" />
              </div>

              {faker.map((item) => {
                return (
                  <>
                    {searchField === '' ? (
                      item.value.length === 0 ? (
                        ''
                      ) : (
                        <div>
                          <div className="SelectMock-list__title">
                            <span>{item.theme}</span>
                          </div>
                          <hr />
                        </div>
                      )
                    ) : filterObj(searchField, item).length === 0 ? (
                      ''
                    ) : item.value.length === 0 ? (
                      ''
                    ) : (
                      <div>
                        <div className="SelectMock-list__title">
                          <span>{item.theme}</span>
                        </div>
                        <hr />
                      </div>
                    )}

                    <div
                      onClick={() =>
                        setIsComponentVisible(
                          (isComponentVisible) => (isComponentVisible = !isComponentVisible),
                        )
                      }>
                      {searchField === ''
                        ? item.value.map((item) => {
                            return (
                              <p
                                className={valueSelect === item ? 'selected-faker-value' : ''}
                                onClick={() => setValueSelect(item)}>
                                {item}
                              </p>
                            );
                          })
                        : filterObj(searchField, item).map((item) => {
                            return (
                              <p
                                className={valueSelect === item ? 'selected-faker-value' : ''}
                                onClick={() => setValueSelect(item)}>
                                {item}
                              </p>
                            );
                          })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default FakerSelect;
