import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import i18n from 'i18next';

class Subtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSubtask: "",
      editedSubtask: "",
      focusedSubtask: null,
      newItem: "",
      newItemCount: 1,
      newItemUnit:
        this.props.units.length === 0 ? null : this.props.units[0].id,
      newItemPrice: 1,
      editedItem: null
    };
  }

  /**
   * This function passes trough all materials and adds them together
   * @param  {array} items Array of all materials
   * @return {integer}       Sum of all items
   */
  sumItems(items) {
    let count = 0;
    items.map(item => (count = count + item.amount * item.unit_price));
    return count;
  }

  render() {
    return (
      <div>
        <table className="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>{i18n.t('subtasks')}</th>
              <th
                style={{ width: "40px", border: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {this.props.subtasks.map((subtask) => (
              <tr key={subtask.id}>
                <td style={{ border: "0px" }}>
                  <div style={{ display: "flex" }}>
                    <input
                      key={subtask}
                      type="checkbox"
                      checked={subtask.done}
                      onChange={() =>{
                          let subtasks = [...this.props.subtasks];
                          let index = subtasks.findIndex((sub)=>sub.id===subtask.id);
                          subtask.done=!subtask.done;
                          subtasks[index]= subtask;
                          this.props.onChangeSubtasks(subtasks);
                      }}
                      style={{ margin: "auto", marginRight: 10 }}
                    />
                    <input
                      type="text"
                      id="name"
                      value={ subtask.title}
                      onChange={(e) =>{
                          let subtasks = [...this.props.subtasks];
                          let index = subtasks.findIndex((sub)=>sub.id===subtask.id);
                          subtask.title=e.target.value;
                          subtasks[index]= subtask;
                          this.props.onChangeSubtasks(subtasks);
                      }}
                      className="form-control"
                      placeholder={i18n.t('enterSubtask')}
                      style={{ border: "none" }}
                    />
                  </div>
                </td>

                <td style={{ border: "0px" }}>
                  <div
                    style={{ float: "right", paddingRight: 20 }}
                    className="row"
                  >
                    <button
                      className="btn btn-sm btn-link"
                      onClick={() => {
                        let subtasks = [...this.props.subtasks];
                        let index = subtasks.findIndex((sub)=>sub.id===subtask.id);
                        subtasks.splice(index,1);
                        this.props.onChangeSubtasks(subtasks);
                      }}
                    >
                      <i className="fa fa-remove" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/*Row allowing new subtasks*/}
            <tr>
              <td colSpan="3" style={{ border: "0px" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder={i18n.t('enterNewSubtask')}
                    value={this.state.newSubtask}
                    onChange={e =>
                      this.setState({ newSubtask: e.target.value })
                    }
                  />
                  <button
                    style={{ float: "right" }}
                    className="btn btn-sm btn-link mr-1"
                    onClick={() => {
                      let subtasks = [...this.props.subtasks];
                      subtasks.push({id:this.props.subtasks.length,title:this.state.newSubtask,done:false});
                      this.setState({newSubtask:''});
                      this.props.onChangeSubtasks(subtasks);
                    }}
                  >
                    <i className="fa fa-plus " />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Subtasks ends, materials starts*/}

        <table className="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th style={{ border: "0px" }}>{i18n.t('invoiceableItems')}</th>
              <th style={{ width: "10%", border: "0px" }}>{i18n.t('amount')}</th>
              <th style={{ width: "10%", border: "0px" }}>{i18n.t('pricePerUnit')}</th>
              <th style={{ width: "15%", border: "0px" }}>{i18n.t('unit')}</th>
              <th
                style={{ width: "40px", border: "0px", textAlign: "right" }}
              />
            </tr>
          </thead>
          <tbody>
            {this.props.materials.map(material => (
              <tr key={material.id}>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={material.title}
                    onChange={(e) =>{
                        let materials = [...this.props.materials];
                        let index = materials.findIndex((mat)=>mat.id===material.id);
                        material.title=e.target.value;
                        materials[index]= material;
                        this.props.onChangeMaterials(materials);
                    }}
                    className="form-control"
                    placeholder={i18n.t('itemName')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={material.amount}
                    onChange={(e) =>{
                        let materials = [...this.props.materials];
                        let index = materials.findIndex((mat)=>mat.id===material.id);
                        material.amount=e.target.value;
                        materials[index]= material;
                        this.props.onChangeMaterials(materials);
                    }}
                    className="form-control"
                    placeholder={i18n.t('amount')}
                  />
                </td>
                <td>
                  <input
                    style={{ border: "none" }}
                    type="text"
                    value={material.unit_price}
                    onChange={(e) =>{
                        let materials = [...this.props.materials];
                        let index = materials.findIndex((mat)=>mat.id===material.id);
                        material.unit_price=e.target.value;
                        materials[index]= material;
                        this.props.onChangeMaterials(materials);
                    }}
                    className="form-control"
                    placeholder={i18n.t('pricePerUnit')}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={material.unit}
                    id="status"
                    onChange={(e) =>{
                        let materials = [...this.props.materials];
                        let index = materials.findIndex((mat)=>mat.id===material.id);
                        material.unit=e.target.value;
                        materials[index]= material;
                        this.props.onChangeMaterials(materials);
                    }}
                  >
                    {this.props.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.title}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button
                    style={{ float: "right" }}
                    className="btn  btn-sm btn-link mr-1"
                    onClick={() => {
                      let materials = [...this.props.materials];
                      let index = materials.findIndex((mat)=>mat.id===material.id);
                      materials.splice(index,1);
                      this.props.onChangeMaterials(materials);
                    }}>
                    <i className="fa fa-remove" />
                  </button>
                </td>
              </tr>
            ))}
            {/*Row allowing new materials*/}
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.newItem}
                  onChange={e => this.setState({ newItem: e.target.value })}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newItemCount}
                  type="number"
                  onChange={e =>
                    this.setState({ newItemCount: e.target.value })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newItemPrice}
                  type="number"
                  onChange={e =>
                    this.setState({ newItemPrice: e.target.value })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.newItemUnit}
                  id="status"
                  onChange={e => {
                    this.setState({ newItemUnit: e.target.value });
                  }}
                >
                  {this.props.units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.title}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  style={{ float: "right" }}
                  onClick={() => {
                    let materials = [...this.props.materials];
                    materials.push({id:this.props.materials.length,title:this.state.newItem,amount:this.state.newItemCount,unit_price:this.state.newItemPrice, unit:this.state.newItemUnit});
                    this.setState({
                      newItem: "",
                      newItemCount: 1,
                      newItemPrice: 1
                    });
                    this.props.onChangeMaterials(materials);
                  }}
                  className="btn-sm btn btn-link mr-1"
                >
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
            <tr className="table-info">
              <td style={{ textAlign: "right", paddingRight: 50 }} colSpan="5">
                {i18n.t('priceWithoutVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {(this.sumItems(this.props.materials) * 0.8).toFixed(2)}
                </span>
              </td>
            </tr>
            <tr className="table-info">
              <td
                style={{ borderTop: 0, textAlign: "right", paddingRight: 50 }}
                colSpan="5"
              >
                {i18n.t('priceWithVAT')}
                <span style={{ fontWeight: "bold" }}>
                  {this.sumItems(this.props.materials).toFixed(2)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Subtasks;
