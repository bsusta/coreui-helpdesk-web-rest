import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup
} from "reactstrap";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Subtask from "./Subtasks";
import MultiSelect from "../../multiSelect";

let mockOptions = [
  { id: 0, title: "Moznost 1", color: "#57b141" },
  { id: 1, title: "Moznost 2", color: "#8ebfbe" },
  { id: 2, title: "Moznost 3", color: "#a8bbbc" },
  { id: 3, title: "Moznost 4", color: "#0eb2ac" },
  { id: 4, title: "Moznost 5", color: "#7329b1" }
];

let mockStatus = [
  { id: 0, title: "Novy", color: "#6495ed" },
  { id: 1, title: "Riesit", color: "#458b74" },
  { id: 2, title: "Odložené", color: "#d68a00" },
  { id: 3, title: "Zavreté", color: "#7b7e8b" }
];

let mockPausal = [
  { id: 0, title: "Ano", color: "#57b141" },
  { id: 1, title: "Nie", color: "#8ebfbe" }
];

let mockRepeat = [
  { id: 0, title: "day", color: "#57b141" },
  { id: 1, title: "week", color: "#8ebfbe" },
  { id: 2, title: "month", color: "#d68a00" },
  { id: 3, title: "year", color: "#7b7e8b" }
];

let mockTypPrace = [
  { id: 0, title: "Servis IT", color: "#57b141" },
  { id: 1, title: "Programovanie", color: "#8ebfbe" }
];

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      selected: 0,
      dropdownOpen: false,
      tags:[]
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <Card className="newEditCard" style={{height:"100%"}}>
        <CardHeader>
          <button class="btn btn-success mr-1">
            <i class="fa fa-save" /> Ulozit
            </button>
            <button class="btn btn-warning mr-1">
              <i class="fa fa-ban" /> Cancel
              </button>

              <button class="btn btn-primary mr-1">
                <i class="fa fa-print" /> Print
                </button>
                <button class="btn btn-danger mr-1">
                  <i class="fa fa-remove" /> Vymazať
                  </button>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-9" style={{ borderRight: "1px solid #eee" }}>

                      <form>
                        <div class="form-group">
                          <input
                            class="form-control underlined-input"
                            id="title"
                            placeholder="Oprava PC"
                            style={{fontSize:20}}
                            value="Oprava PC"
                            />
                        </div>
                        <div class="form-group">
                          <MultiSelect
                            data={mockOptions}
                            displayValue="title"
                            selectedIds={this.state.tags}
                            idValue="id"
                            filterBy="title"
                            title= "Select tags"
                            display="row"
                            displayBoxStyle={{width:100}}
                            menuItemStyle={{marginLeft:7,marginRight:7,marginTop:2,marginBottom:2,paddingTop:2,paddingBottom:2}}
                            renderItem={(item)=><span class="badge" style={{backgroundColor:item.color,color:'white', margin:'auto',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5, marginLeft:5}}>{item.title}</span>}
                            colored={true}
                            titleStyle={{backgroundColor:'white',color:'black',size:15}}
                            toggleStyle={{backgroundColor:'white',border:'none',padding:0}}
                            label={"+Tags"}
                            labelStyle={{marginLeft:10}}
                            searchStyle={{margin:5}}
                            onChange={(ids,items)=>{this.setState(ids);}}
                            />
                        </div>
                        <div class="form-group underlined-input">
                          <label for="description">Description</label>
                          <textarea
                            class="form-control"
                            id="description"
                            placeholder="Enter description"
                            style={{border:'none'}}
                            />
                        </div>
                      </form>
                      <Subtask />
                      <AddComment />
                      <Comments />
                    </div>
                    <div className="col-3">
                      <form>
                        <label for="status">Status</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                          <select
                            class="form-control"
                            style={{
                              color: "white",
                              backgroundColor: mockOptions[this.state.selected].color
                            }}
                            selected={this.state}
                            id="status"
                            onChange={(event, value) => {
                              this.setState({ selected: event.target.value });
                            }}
                            >
                            {mockStatus.map(opt => (
                              <option
                                key={opt.id}
                                style={{ color: "white", backgroundColor: opt.color }}
                                value={opt.id}
                                >
                                {opt.title}
                              </option>
                            ))}
                          </select>

                        </div>

                        <div class="form-group">
                          <label for="title">Due date</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>

                            <input class="form-control underlined-input" id="title" />
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="project">Project</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                            <select class="form-control underlined-input" id="project">
                              {mockOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                  {opt.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="requester">Requester</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                            <select class="form-control underlined-input" id="requester">
                              {mockOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                  {opt.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="company">Company</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                            <select class="form-control underlined-input" id="company">
                              {mockOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                  {opt.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="assigned">Assigned</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                            <select class="form-control underlined-input" id="assigned">
                              {mockOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                  {opt.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="title">Odpracované hodiny</label>
                          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon underlined-input"><i className="icon-envelope-letter"></i></div>
                            <input class="form-control underlined-input" id="title" />
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="assigned">Typ práce</label>
                          <select class="form-control underlined-input" id="assigned">
                            {mockTypPrace.map(opt => (
                              <option key={opt.id} value={opt.id}>
                                {opt.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="assigned">Pausal</label>
                          <select class="form-control underlined-input" id="assigned">
                            {mockPausal.map(opt => (
                              <option key={opt.id} value={opt.id}>
                                {opt.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="assigned">Opakovanie</label>

                          <Dropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={this.toggle}
                            >
                            <DropdownToggle caret>no repeat</DropdownToggle>
                            <DropdownMenu>
                              <form class="px-4 py-3">
                                <div class="form-group">
                                  <label for="exampleDropdownFormEmail1">
                                    Repeat every
                                  </label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    id="exampleDropdownFormEmail1"
                                    />
                                </div>
                                <div class="form-group">
                                  <select class="form-control" id="assigned">
                                    {mockRepeat.map(opt => (
                                      <option key={opt.id} value={opt.id}>
                                        {opt.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="exampleDropdownFormEmail1">
                                    Start date
                                  </label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    id="exampleDropdownFormEmail1"
                                    />
                                </div>
                                <button type="submit" class="btn btn-primary">
                                  Save
                                </button>
                              </form>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div class="form-group">
                          <label for="assigned">Prílohy</label>
                          <button class="btn btn-primary btn-block" type="submit">
                            Add prílohu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          }
        }

        export default EditTask;
