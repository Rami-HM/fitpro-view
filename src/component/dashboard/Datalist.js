import React from "react";
import { Table, Text, Module } from "gestalt";

function createData(id, name, startdate, enddate, status, important) {
  return { id, name, startdate, enddate, status, important };
}

const rows = [
  createData(1, "task1", "2021.07.03", " ~ 2021.08.01", "진행중", "중요도 높음"),
  createData(2, "task2", "2021.08.02", " ~ 2021.08.05", "예정", "중요도 높음"),
  createData(3, "task3", "2021.08.03", " ~ 2021.08.07", "예정", "중요도 낮음"),
];

export default function Datalist() {
  return (
    <div className="wdt-100 wdt-100-chd">
      <Module>
        <Table minWidth="100%" maxHeight={200}>
          <Table.Header></Table.Header>
          <Table.Body>
            {rows.map((item) => {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Text>{item.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.startdate}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.enddate}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.status}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.important}</Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Module>
    </div>
  );
}
