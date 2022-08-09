import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { useTable, usePagination } from 'react-table'
import axios from "axios";


//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
const Td = styled.td`
  color: #757575;
  text-align: center;
  font-size: 0.85rem;
  padding: 20px;                     
  /* background: #F9F9F9; */
  width: 5rem;
    // textOverflow: "ellipsis",
    // overflow:"hidden",
   // whiteSpace:"nowrap",
  /* border-bottom: 2px #19191D solid; */

`
const Select = styled.select`
  width: 40%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px black solid;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Tr = styled.tr`
  
  & :nth-child(even){
    background-color: #f2f2f2;
  }
  & :hover{
    background-color: #ddd;
  }
`

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data: db }) {
  console.log(db)
  const [states, setStates] = useState(null);
  const [category, setCategory] = useState(db[0] == 'funds' ? '' : db[0]);
  const [cities, setCities] = useState(null);
  const [selectedState, setSelectedState] = useState(db[db.length - 1]);
  const [selectedCity, setSelectedCity] = useState('');
  const [datas, setDatas] = useState(null);
  const fetchStates = async () => {
    const res = await axios.get('https://felvin-fund-raiser.fly.dev/state')
    setStates(res.data)
  }
  const fetchCities = async (state) => {
    const res = await axios.get(`https://felvin-fund-raiser.fly.dev/city?state=${state}`);
    setCities(res.data)

  }
  const fetchData = async (state, city, category) => {
    let res;
    console.log(city)
    if (city) {
      res = await axios.get(`https://felvin-fund-raiser.fly.dev/?category=${category}&city=${city}&state=${state}`)
    }
    else {
      res = await axios.get(`https://felvin-fund-raiser.fly.dev/?category=${category}&state=${state}`)
    }
    setDatas(res.data)
  }


  useEffect(() => {
    fetchStates();
    fetchData(selectedState, selectedCity, category)
  }, [selectedState, selectedCity])
  useEffect(() => {
    fetchCities(selectedState)
  }, [selectedState])

  const data = useMemo(
    () => {
      let rows = [];
      if (datas) {
        datas.map((item) => {
          let row = {
            col1: item.firm ? item.firm : 'NA',
            col2: item.website ? item.website : "NA",
            col3: item.check_size ? item.check_size : "NA",
            col4: item.category.join(','),
            col5: item.crunchbase_url ? item.crunchbase_url : "NA"
          }
          rows.push(row)

        })
      }
      return rows;
    },
    [datas]
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Investor',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Website',
        accessor: 'col2',
      },
      {
        Header: 'check size(in M)',
        accessor: 'col3',
      },
      {
        Header: 'Category',
        accessor: 'col4',
      },
      // {
      //   Header: 'Crunchbase Url',
      //   accessor: 'col5',
      // },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    headerGroups,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    page,
    pageIndex,
    pageSize,

    prepareRow,
  } = useTable({ columns, data, }, usePagination)
  useEffect(() => {
    setPageSize(5)
  }, [])

  return (
    <Container>
      <div style={{ width: '100%', marginBottom: '1rem' }}>
        <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          {states && states.map((el) => <option value={el} >
            {el}
          </option>)}

        </Select>
        <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          {cities && cities.map((el) => <option value={el} >
            {el}
          </option>)}
        </Select>
      </div>
      <table {...getTableProps()} cellSpacing='0' style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{


                    color: 'white',
                    background: '#74d6f4',
                    padding: '15px 20px',
                    fontSize: '0.8rem'

                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}  >
                {row.cells.map(cell => {
                  return (
                    <Td
                      {...cell.getCellProps()}

                    >
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex} of {pageOptions.length}
          </strong>{' '}
        </span>

      </div>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(
      query,
      [


        "funds",
        "based",
      ],
      { substringMatch: true }
    )
  ) {
    return;
  }
  let data = query.split(' ');


  return data;
}

export { queryToData, Component };
