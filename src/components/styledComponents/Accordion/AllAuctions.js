import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackFace, DefaultTokenIcon } from "../../../assets/icon";
import HeadIcon from "../../../assets/images/accordionHeadProfile.png";
import SmallButton from "../Buttons/SmallButton";
import {
  viewUp,
  viewDown,
  eth,
  GreenDot,
  GrayDot,
  WarningIcon,
} from "../../../assets/icon";
import { useTable } from "react-table";
import Warning from "./../Messages/Warning";
import SwitchInput from "./../Inputs/SwitchInput";
import { useNavigate } from "react-router-dom";
import ViewButton from "../Buttons/ViewButton";
import WarningToolpit from "../Toolpit/WarningToolpit";

// Usage
//
// <Accordion />

// As of now everything is hardcoded for simplicity
// props when passed can be handled in the future

const MainContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "809px")};
  background: #07080a;
  box-sizing: border-box;

  border-radius: 15px;
  border: 1px solid #656565;
  box-shadow: 0px 5px 20px #000000;
  height: fit-content;
`;

const HeadContainer = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
`;
const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const IconContainer = styled.div``;

const BodyContainer = styled.div``;

const Next = styled.div`
  color: #ffa5f6;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;
`;

const AuctionHeader = styled.div`
  padding: 5px 15px 20px 15px;
  border-bottom: 1px solid #656565;
`;

const AuctionHead = styled.div`
  display: flex;
  gap: 5px;
  padding-bottom: 10px;
`;

const ListContainer = styled.div`
  padding: 15px;
`;

const ListHeader = styled.div``;

const Footer = styled.div``;

const List = styled.div``;

const TableContainer = styled.div`
  table {
    width: 100%;

    tbody {
      tr {
        background: #191e24;
        border-radius: 15px;
        margin-bottom: 5px;
      }
    }
  }
`;

const Td = styled.td`
  padding: 15px;
`;

const Th = styled.th`
  padding: 15px;
  text-align: left;
`;

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const navigate = useNavigate();

  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index} className="">
              {headerGroup.headers.map((column, i) => (
                <Th key={i} {...column.getHeaderProps()} className="text-sm ">
                  {column.render("Header")}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => {
                  return cell.column.id === "token" ? (
                    <Td key={index}>
                      <div className="flex" style={{ gap: "5px" }}>
                        {cell?.value?.icon ? (
                          <img
                            className="h-6 w-6 rounded-full"
                            alt="token Icon"
                            src={cell?.value?.icon}
                          />
                        ) : (
                          <DefaultTokenIcon width="24" height="24"/>
                        )}

                        <p>{cell?.value?.name}</p>
                      </div>
                    </Td>
                  ) : cell.column.id === "auctionStatus" ? (
                    <Td key={index}>
                      <div className="flex items-center gap-2.5">
                        {cell.value.active === "1" ? (
                          <GreenDot />
                        ) : cell.value.active === "-1" ? (
                          <GrayDot />
                        ) : (
                          <div className="h-2 inline-block w-2 rounded-full my-auto bg-blue-500"></div>
                        )}
                        {cell.value.active === "1"
                          ? "Ends in "
                          : cell.value.active === "-1"
                          ? "Ended "
                          : "Starts in "}

                        {cell?.value?.time}

                        {cell.value.active === "-1" ? " ago" : ""}
                      </div>
                    </Td>
                  ) : cell.column.id === "network" ? (
                    <Td key={index}>
                      <img
                        style={{ height: "20px", width: "20px" }}
                        alt="token Icon"
                        src={cell?.value}
                      />
                    </Td>
                  ) : cell.column.id === "price" ? (
                    <Td key={index}>${parseFloat(cell?.value).toFixed(4)}</Td>
                  ) : cell.column.id === "key" ? (
                    <Td className="flex justify-center" key={index}>
                      <button
                        className="border border-primary text-primary text-xs py-0.5 px-3 rounded-2xl"
                        onClick={() => {
                          navigate(`/view-auction/${cell?.value?.pool}`, {
                            state: { poolId: cell?.value?.poolId },
                          });
                        }}
                      >
                        View
                      </button>
                    </Td>
                  ) : (
                    <Td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
};

const Accordion = (props) => {
  // Can change it later or can be passed down as a prop
  let MaxRowsToShow = 4;
  const [currPage, setCurrPage] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const columns = [
    {
      Header: "Token",
      accessor: "token",
    },
    {
      Header: "Network",
      accessor: "network",
    },
    {
      Header: "Auction Status",
      accessor: "auctionStatus",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "More",
      accessor: "key",
    },
  ];

  // const data = [
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: true,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: true,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: false,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  //     {
  //         token: {
  //             icon: HeadIcon,
  //             name: "RAIN",
  //         },
  //         network: eth,
  //         auctionStatus: {
  //             active: true,
  //             time: "3.06",
  //         },
  //         price: 0.145,
  //         key: "something"
  //     },
  // ];

  const [isOpen, setisOpen] = useState(false);

  // Change here to display dynamic data
  //   useEffect(() => {
  //     let dataLength = props.auctions.length;
  //     // console.log(MaxRowsToShow);
  //     // console.log(dataLength);
  //     // console.log(dataLength/MaxRowsToShow, "Number of times to show");
  //     setMaxCount(Math.ceil(dataLength / MaxRowsToShow));
  //     setDisplayData(
  //       props.auctions.slice(
  //         currPage * MaxRowsToShow,
  //         (currPage + 1) * MaxRowsToShow
  //       )
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    let dataLength = props.auctions.length;
    // console.log(MaxRowsToShow);
    // console.log(dataLength);
    // console.log(dataLength/MaxRowsToShow, "Number of times to show");
    setMaxCount(Math.ceil(dataLength / MaxRowsToShow));
    setDisplayData(
      props.auctions.slice(
        currPage * MaxRowsToShow,
        (currPage + 1) * MaxRowsToShow
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auctions]);

  useEffect(() => {
    if (!isOpen) {
      let curr = 0;
      setCurrPage(0);
      setDisplayData(
        props.auctions.slice(curr * MaxRowsToShow, (curr + 1) * MaxRowsToShow)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  const loadData = () => {
    setDisplayData(props.auctions.slice(0, (currPage + 1) * MaxRowsToShow));
  };

  useEffect(() => {
    console.log(displayData, "Hello");
  }, [displayData]);

  return (
    <MainContainer width={props.width}>
      <HeadContainer>
        <TitleContainer>
          <IconContainer width="30px">
            <BlackFace />
          </IconContainer>

          {/* Did this temporarily will do the text styling via tailwind in the real repo */}
          <h3 className="text-sm font-normal">All Auctions (Unvetted)</h3>

          <WarningToolpit />
        </TitleContainer>
        <SmallButton
          variant="view"
          openIcon={viewUp}
          closeIcon={viewDown}
          width="70px"
          isOpen={isOpen}
          setisOpen={setisOpen}
        >
          View
        </SmallButton>
      </HeadContainer>
      {isOpen ? (
        <BodyContainer>
          <AuctionHeader width={props.width}>
            <AuctionHead>
              <h4 className="font-bold">Low Liquidity Displayed</h4>
              <SwitchInput
                value={false}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </AuctionHead>

            <Warning />
          </AuctionHeader>

          <ListContainer>
            <ListHeader></ListHeader>
            <List>
              <Table columns={columns} data={displayData}></Table>
            </List>
          </ListContainer>
          {currPage < maxCount - 1 ? (
            <Footer>
              <Next
                onClick={() => {
                  setCurrPage(currPage + 1);
                }}
              >
                Load More
              </Next>
            </Footer>
          ) : null}
        </BodyContainer>
      ) : null}
    </MainContainer>
  );
};

export default Accordion;
