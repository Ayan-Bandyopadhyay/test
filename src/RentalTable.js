import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';


const RentalTable = (props) => {
    const rawData = props.data
    const [selectedRow, setSelectedRow] = useState(-1)
    if (rawData.length == 0) {
        return (
            <div></div>
        )
    }
  
    const columns = ["id", "name", "city", "country", "prices.price", "prices.period"]
    const column_to_idx = {}
    const column_to_display_name = {
        id: "Image",
        name: "Name",
        city: "City",
        country: "Country",
    }
    column_to_display_name["prices.price"] = "Price"
    column_to_display_name["prices.period"] = "Pricing Period"

    const details = ["deposit", "descriptions", "features", "fees", 
        "numBathroom", "numBedroom", "numBed", "numPeople", "prices.dateValidStart", 
        "prices.dateValidEnd", "prices.minStay", "rules"]
    const detail_to_idx = {}
    const detail_to_display_name = {
        deposit: "Deposit",
        descriptions: "Description",
        features: "Features",
        fees: "Fees",
        numBathroom: "Bathrooms",
        numBedroom: "Bedrooms",
        numBed: "Beds",
        numPeople: "Max people allowed",
        rules: "Rules" 
    }
    detail_to_display_name["prices.dateValidStart"] = "Valid start date"
    detail_to_display_name["prices.dateValidEnd"] = "Valid end date"
    detail_to_display_name["prices.minStay"] = "Minimum stay"

    const colNames = rawData[0]
    for (var i = 0; i < colNames.length; i++) {
        var col = colNames[i]
        if (columns.includes(col)) {
            column_to_idx[col] = i
        }
        if (details.includes(col)) {
            detail_to_idx[col] = i
        }
    }
    const data = rawData.slice(1)
    const handleClick = (id) => {
        if (selectedRow == id) {
            setSelectedRow(-1)
        } else {
            setSelectedRow(id)
        }
    }
    return (
      <table style={{border: "1px solid #000", width: "100%"}}>
          <thead> 
            <tr>
                {columns.map((col) => {
                    return (<td>{column_to_display_name[col]}</td>)
                })}
            </tr>
          </thead>
          <tbody>
          {data.map((entry) => {
              const id = entry[column_to_idx["id"]]
              return (
                  <>
                    <tr style={{outline: "thin solid"}} onClick={() => {handleClick(id)}}>
                        {columns.map((col) => {
                            if (column_to_display_name[col] == "Image") {
                                const url = "https://picsum.photos/id/" + id + "/200/300"
                                return <td style={{outline: "thin solid"}}><img src={url}></img></td>
                            } else {
                                return (<td style={{outline: "thin solid"}}>{entry[column_to_idx[col]]}</td>)
                            }
                        
                        })}
                    </tr>
                    {selectedRow == id && (
                        <tr>
                            <td colSpan={columns.length}>
                                {details.map((detail) => {
                                    var name = detail_to_display_name[detail]
                                    var val = entry[detail_to_idx[detail]]
                                    var desc = name + ": " + val
                                    if (detail == "fees") {
                                        val = JSON.parse(val)
                                        return (
                                            <>
                                                {val.map((fee) => {
                                                    name = fee.type + " Fee"
                                                    val = fee.amount
                                                    desc = name + ": " + val
                                                    return (<div>{desc}</div>)
                                                })}
                                            </>
                                        )
                                    } else if (val == '') {
                                        return
                                    } else {
                                        return ( <div>{desc}</div>)
                                    }
                                    
                                    
                                })}
                                
                            </td>
                        </tr>
                    )}
                  </>
                
              )
          })}
          </tbody> 
      </table>
    );
  }

export default RentalTable;