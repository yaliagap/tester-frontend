import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Download extends React.Component {
    render() {
        return (
            <ExcelFile element={<button className="btn-floating btn-large waves-effect waves-light cognitiva-blue"><span><i className="material-icons">file_download</i></span></button>}>
                <ExcelSheet data={this.props.data} name="Employees">
                    <ExcelColumn label="Resultado" value="resultadoClass"/>
                    <ExcelColumn label="Conversation Id" value="conversation_id"/>
                    <ExcelColumn label="Mensaje" value="u"/>
                    <ExcelColumn label="Respuesta" value="b"/>
                    <ExcelColumn label="Esperado" value="esperado"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}