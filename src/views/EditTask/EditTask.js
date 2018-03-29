import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Input,
  FormGroup
} from "reactstrap";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Subtask from "./Subtasks";
import { connect } from 'react-redux';
import {getTaskSolvers,deleteTaskSolvers, editTask } from '../../redux/actions';
import {timestampToString} from '../../helperFunctions';
import MultiSelect from '../../components/multiSelect';
class EditTask extends Component {
  constructor(props) {
    super(props);
    let task_data={};
    this.props.taskAttributes.map((attribute)=>
    {
      let value='';
      switch (attribute.type) {
        case 'input':
          value='';
        break;
        case 'text_area':
          value='';
        break;
        case 'simple_select':
          if(attribute.required){
            value=attribute.options[0];
          }
          else{
            value='null';
          }
        break;
        case 'multi_select':
          value=[];
        break;
        case 'date':
          value=''
        break;
        case 'decimal_number':
          value=''
        break;
        case 'integer_number':
          value=''
        break;
        case 'checkbox':
          value=false;
        break;
        default:
          value='null'

      }
      task_data[attribute.id]=value;
    }
    )


    this.props.task.taskData.map((attribute)=>{
      if(task_data.hasOwnProperty(attribute.taskAttribute.id)){
        (['value','dateValue','boolValue']).map((i)=>{
          if(attribute[i]!==undefined){
            switch (i) {
              case 'dateValue':{
                let date= new Date(attribute.dateValue*1000);
                if(isNaN(date)){
                  task_data[attribute.taskAttribute.id]=null;
                }
                else{
                  task_data[attribute.taskAttribute.id]=date.toISOString().substring(0,date.toISOString().length-1);
                }
                break;
              }
              case 'value':{
                let original = this.props.taskAttributes[this.props.taskAttributes.findIndex((item)=>item.id==attribute.taskAttribute.id)];
                if(original.type==='multi_select'){
                  if(attribute.value===null){
                    task_data[attribute.taskAttribute.id]=[];
                    break;
                  }
                  let selected=[];
                  attribute.value.map((val)=>selected.push(original.options.indexOf(val)));
                  task_data[attribute.taskAttribute.id]=selected;
                }
                else{
                  task_data[attribute.taskAttribute.id]=attribute.value;
                }
                break;
              }
              case 'boolValue':
                task_data[attribute.taskAttribute.id]=attribute.boolValue;
                break;
              default:
                break;
            }
          }
        });
      }
    });

    let deadline= '';
    if(this.props.task.deadline){
      deadline = new Date(this.props.task.deadline*1000);
      deadline=deadline.toISOString().substring(0,deadline.toISOString().length-1);
    }
    let startedAt= '';
    if(this.props.task.startedAt){
      startedAt = new Date(this.props.task.startedAt*1000);
      startedAt=startedAt.toISOString().substring(0,startedAt.toISOString().length-1);
    }
    let closedAt= '';
    if(this.props.task.closedAt){
      closedAt = new Date(this.props.task.closedAt*1000);
      closedAt=closedAt.toISOString().substring(0,closedAt.toISOString().length-8);
    }

    this.state = {
      company:this.props.task.company.id,
      deadline,
      startedAt,
      closedAt,
      description:this.props.task.description,
      important:this.props.task.important,
      project:this.props.task.project.id.toString(),
      requestedBy:this.props.task.requestedBy.id,
      status:this.props.task.status.id,
      tags:this.props.task.tags.filter((tag)=>this.props.tags.findIndex((item)=>item.id===tag.id)!=-1).map((tag)=>tag.id),
      title:this.props.task.title,
      workTime:this.props.task.workTime?this.props.task.workTime:'',
      work:this.props.task.work?this.props.task.work:'',
      newTags:[],
      newTag:'',
      ///////
      taskSolver:this.props.task.taskHasAssignedUsers.length==0?'null':Object.values(this.props.task.taskHasAssignedUsers)[0].user.id,
      attachements:[],
      task_data
    };
    this.autoSubmit.bind(this);
    console.log(this.props.task);
  }

  componentWillMount(){
    this.props.getTaskSolvers(this.props.task.project.id,this.props.token);
  }

  autoSubmit(key,value,id){
    let state = {...this.state}
    if(key=='task_data'){
      state.task_data[id]=value;
    }
    else{
      state[key]=value;
    }
    let task_data={...this.state.task_data};  //create copy of company data
    for (let key in task_data){
      let companyAttribute=this.props.taskAttributes[this.props.taskAttributes.findIndex((item)=>item.id==key)]; //from ID find out everything about the field
      switch (companyAttribute.type) {
        case 'multi_select':{ //its array of IDs, we need array if values
          if(task_data[key].length===0){
            task_data[key]='null';
            break;
          }
          let newMulti=[];
          task_data[key].map((item)=>newMulti.push(companyAttribute.options[parseInt(item)]));
          task_data[key]=newMulti;
          break;
        }
        case 'date':        //date should be formatted into miliseconds since 1970, divided by 1000 because of PHP/Javascript difference
          let date=((new Date(task_data[key])).getTime()-((new Date()).getTimezoneOffset()*60000))/1000
          if(isNaN(date)){  //if there is no date
            task_data[key]='null';
            break;
          }
          task_data[key]=date;
          break;
        case 'checkbox':
          task_data[key]=task_data[key].toString();
          break;
        case 'input':
          if(task_data[key]===''){
            task_data[key]='null';
          }
          break;
        case 'text_area':
          if(task_data[key]===''){
            task_data[key]='null';
          }
          break;
        break;
        case 'decimal_number':
        if(isNaN(parseFloat(this.state.task_data[key]))){
            task_data[key]='null';
          }
        break;
        case 'integer_number':
        if(isNaN(parseFloat(this.state.task_data[key]))){
            task_data[key]='null';
          }
        break;
        default:
          break;
          }
        }

      let deadline=((new Date(state.deadline)).getTime()-((new Date()).getTimezoneOffset()*60000))/1000
      if(isNaN(deadline)){  //if there is no date
        deadline='null';
      }

      let closedAt=((new Date(state.closedAt)).getTime()-((new Date()).getTimezoneOffset()*60000))/1000
      if(isNaN(closedAt)){  //if there is no date
        closedAt='null';
      }

      let startedAt=((new Date(state.startedAt)).getTime()-((new Date()).getTimezoneOffset()*60000))/1000
      if(isNaN(startedAt)){  //if there is no date
        startedAt='null';
      }
      let tags=[];
      state.tags.map((addTag)=>tags.push(this.props.tags.concat(state.newTags).find((tag)=>tag.id==addTag).title));
      console.log(state.taskSolver);
      this.props.editTask(
        {
          title:state.title,
          description:state.description,
          deadline,
          startedAt,
          closedAt,
          important:state.important,
          work:state.work,
          workTime:state.workTime.length==0?undefined:state.workTime,
          tag:JSON.stringify(tags),
          assigned:state.taskSolver!='null'?JSON.stringify([{userId:parseInt(state.taskSolver)}]):null,
          taskData:JSON.stringify(task_data),
        },
          this.props.task.id,
          state.project,
          state.status,
          state.requestedBy,
          state.company,
          this.props.token);

  }

  render() {
    return (
      <div>
        <Card
          style={{
            margin: "auto",
            borderTop: "0",
            minWidth: 800,
            backgroundColor: "#f0f3f5"
          }}
        >
          <CardHeader>
            <button class="btn btn-success mr-1" onClick={this.props.history.goBack}>
              <i class="fa fa-ban" /> Back
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
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div class="form-group">
                    <label for="title">Task Name</label>
                    <label className="float-right">
                      Vytvoril: {this.props.task.createdBy.username} ({this.props.task.createdBy.email}) {timestampToString(this.props.task.createdAt)}
                    </label>
                    <input
                      class="form-control"
                      id="title"
                      placeholder="Enter title"
                      value={this.state.title}
                      style={{ fontSize: 18 }}
                    />
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <input
                        class="form-control"
                        id="newTag"
                        placeholder="Add new tag"
                        value={this.state.newTag}
                        style={{ width:200, marginLeft:15 }}
                        onChange={(e)=>this.setState({newTag:e.target.value})}
                      />

                    <button class="btn btn-success mr-1" onClick={()=>{
                        this.setState({
                          tags:this.state.tags.concat(((-1)*this.state.newTags.length-1)),
                          newTags:this.state.newTags.concat({
                            title:this.state.newTag,
                            color:'d3d3d3',
                            id:(-1)*this.state.newTags.length-1}),
                          newTag:'',
                        });
                      }}>
                        <i class="fa fa-plus" />
                      </button>
                    </div>
                    <div class="form-group">
                      <MultiSelect
                        id="tags"
                        data={this.state.newTags.concat(this.props.tags)}
                        displayValue="title"
                        selectedIds={this.state.tags}
                        idValue="id"
                        filterBy="title"
                        title= "Tags"
                        display="row"
                        colored={true}
                        displayBoxStyle={{overflowX:'auto'}}
                        menuItemStyle={{marginLeft:7,marginRight:7,marginTop:2,marginBottom:2,paddingTop:2,paddingBottom:2}}
                        renderItem={(item)=><span class="badge" style={{margin:'auto',border: '1px solid black',borderRadius:'3px',color:'white',backgroundColor:'#'+item.color, paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5, marginLeft:5}}>{item.title}</span>}
                        titleStyle={{backgroundColor:'white',color:'black',size:15}}
                        toggleStyle={{backgroundColor:'#F0F3F5',border:'none',padding:0, fontSize:15}}
                        label="Select tags"
                        labelStyle={{marginLeft:10}}
                        searchStyle={{margin:5}}
                        onChange={(ids,items)=>this.setState({tags:ids})}
                        />
                    </div>
                </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      id="description"
                      placeholder="Enter description"
                      value={this.state.description}
                      onChange= {(e)=>{this.autoSubmit('description',e.target.value);this.setState({description:e.target.value});}}
                    />
                  </div>
                </form>
                {
                  /*
                  <Subtask />
                  <AddComment />
                  <Comments />

                   */
                }
              </div>

              <div className="col-4">
                <form>
                  <FormGroup>
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" checked={this.state.important}
                            onChange={()=>this.setState({important:!this.state.important})}
                        />
                        Important
                        </label>
                  </FormGroup>


                  <FormGroup>
                    <label for="status">Status</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <select
                        class="form-control"
                        style={{
                          color: "white",
                          backgroundColor:this.props.statuses.find((status)=>status.id==this.state.status).color
                        }}
                        value={this.state.status}
                        id="status"
                        onChange={(e) => {
                          this.setState({ status: e.target.value });
                        }}
                      >
                        {this.props.statuses.map((status) => (
                          <option
                            key={status.id}
                            style={{
                              color: "white",
                              backgroundColor: status.color
                            }}
                            value={status.id}
                          >
                            {status.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label for="deadline">Due date</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-clock-o" />
                      </InputGroupAddon>

                      <input
                        class="form-control"
                        type="datetime-local"
                        id="deadline"
                        value={this.state.deadline}
                        onChange={(e)=>{
                          this.setState({deadline:e.target.value});
                        }
                      }
                      placeholder={"Select deadline"}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="startedAt">Started at</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-clock-o" />
                      </InputGroupAddon>

                      <input
                        class="form-control"
                        type="datetime-local"
                        id="startedAt"
                        value={this.state.startedAt}
                        onChange={(e)=>{
                          this.setState({startedAt:e.target.value});
                        }
                      }
                      placeholder="Enter start date"
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="closedAt">Closed at</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-clock-o" />
                      </InputGroupAddon>

                      <input
                        class="form-control"
                        type="datetime-local"
                        id="closedAt"
                        value={this.state.closedAt}
                        onChange={(e)=>{
                          this.setState({closedAt:e.target.value});
                        }
                      }
                      placeholder="Enter close date"
                      />
                    </InputGroup>
                  </FormGroup>



                  <FormGroup>
                    <label for="project">Project</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-folder-o" />
                      </InputGroupAddon>
                      <select class="form-control" id="project" value={this.state.project} onChange={(e)=>{
                          this.setState({project:e.target.value, taskSolver:'null'});
                          this.props.deleteTaskSolvers();
                          this.props.getTaskSolvers(e.target.value,this.props.token);
                          }}>
                        {this.props.taskProjects.map(project => (
                          <option key={project.id} value={project.id}>
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="assigned">Assigned</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-user-plus" />
                      </InputGroupAddon>
                      <select class="form-control" id="assigned" value={this.state.taskSolver} onChange={(e)=>{this.setState({taskSolver:e.target.value});}}>
                        {([{id:'null',username:'Nikto'}]).concat(this.props.taskSolvers).map(solver => (
                          <option key={solver.id} value={solver.id}>
                            {solver.username}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="requester">Requester</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-user-o" />
                      </InputGroupAddon>
                      <select class="form-control" id="requester" value={this.state.requestedBy} onChange={(e)=>this.setState({requestedBy:e.target.value})}>
                        {this.props.users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="company">Company</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-building-o" />
                      </InputGroupAddon>
                      <select class="form-control" id="company" value={this.state.company} onChange={(e)=>this.setState({company:e.target.value})}>
                        {this.props.companies.map(company => (
                          <option key={company.id} value={company.id}>
                            {company.title}
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="workTime">Odpracované hodiny</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-hourglass-o" />
                      </InputGroupAddon>
                      <input
                        class="form-control"
                        type="number"
                        id="workTime"
                        value={this.state.workTime}
                        onChange={(e)=>{
                          this.setState({workTime:e.target.value});
                        }
                      }
                      placeholder={"Input work time"}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="work">Práca</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-list" />
                      </InputGroupAddon>
                      <input
                        class="form-control"
                        id="work"
                        value={this.state.work}
                        onChange={(e)=>{
                          this.setState({work:e.target.value});
                        }
                      }
                      placeholder={"Work to do"}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <label for="assigned">Opakovanie</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <i className="fa fa-repeat" />
                      </InputGroupAddon>
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                        style={{ width: "100%" }}
                      >
                        <DropdownToggle
                          style={{
                            width: "100%",
                            textAlign: "left",
                            backgroundColor: "white"
                          }}
                          caret
                        >
                          no repeat
                        </DropdownToggle>
                        <DropdownMenu style={{ width: "100%" }}>
                          <form class="px-4 py-3" style={{ width: "100%" }}>
                            <div class="form-group" style={{ width: "100%" }}>
                              <label for="exampleDropdownFormEmail1">
                                Repeat every
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleDropdownFormEmail1"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleDropdownFormEmail1">
                                Start date
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="exampleDropdownFormEmail1"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <button type="submit" class="btn btn-primary">
                              Save
                            </button>
                          </form>
                        </DropdownMenu>
                      </Dropdown>
                    </InputGroup>
                  </FormGroup>

                  <div class="form-group"  style={{marginBottom:0}}>
                    <label for="fileUpload">Prílohy</label>
                  <input
                    type="file"
                    id="fileUpload"
                    style={{display:'none'}}
                    onChange={(e)=>{
                          let file= e.target.files[0];
                          console.log(file);
                          this.setState({
                         attachements: [
                           {
                             name: file.name,
                             size: file.size,
                             file
                           },
                           ...this.state.attachements
                         ]
                       });
                      }
                    }
                    />
                  <label class="btn btn-primary btn-block" for="fileUpload">Add attachement</label>
                </div>


                  <div class="form-group">
                    <div style={{ paddingTop: 5, paddingRight: 10 }}>
                      {this.state.attachements.map(item => (
                        <span
                          class="badge"
                          style={{
                            backgroundColor: "#d3eef6",
                            color: "black",
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            marginLeft: 5,
                            marginTop: 1,
                            width: "100%",
                            display: "flex"
                          }}
                        >
                          <div
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {item.name}
                          </div>
                          <div style={{ flex: 1 }} />
                          <div
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                          >
                            {item.size}kb
                          </div>

                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            style={{ marginTop: "auto", marginBottom: "auto" }}
                            onClick={() => {
                              let newItems = [...this.state.attachements];
                              newItems.splice(
                                newItems.findIndex(at => at.name == item.name),
                                1
                              );
                              this.setState({ attachements: newItems });
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                color: "black",
                                padding: 5,
                                paddingBottom: 10,
                                margin: 0
                              }}
                            >
                              &times;
                            </span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  {
                    this.props.taskAttributes.map((attribute)=>{
                      switch (attribute.type) {
                        case 'input':
                          return  <div class="form-group">
                                    <label for={attribute.id}>{attribute.title}</label>
                                    <input
                                      class="form-control"
                                      id={attribute.id}
                                      value={this.state.task_data[attribute.id]}
                                      onChange={(e)=>{
                                        let newData={...this.state.task_data};
                                        newData[attribute.id]=e.target.value;
                                        this.setState({task_data:newData});
                                      }
                                    }
                                    placeholder={"Enter "+attribute.title}
                                    />
                                  </div>
                        case 'text_area':
                          return <div class="form-group">
                                    <label for={attribute.id}>{attribute.title}</label>
                                    <textarea
                                      class="form-control"
                                      id={attribute.id}
                                      value={this.state.task_data[attribute.id]}
                                      onChange={(e)=>{
                                        let newData={...this.state.task_data};
                                        newData[attribute.id]=e.target.value;
                                        this.setState({task_data:newData});
                                      }
                                    }
                                    placeholder={"Enter "+attribute.title}
                                    />
                                  </div>
                        case 'simple_select':
                          return <div class="form-group">
                                  <label for={attribute.id}>{attribute.title}</label>
                                  <select
                                    class="form-control"
                                    id={attribute.id}
                                    value={this.state.task_data[attribute.id]}
                                    onChange={(e) => {
                                      let newData={...this.state.task_data};
                                      newData[attribute.id]=e.target.value;
                                      this.setState({task_data:newData});
                                    }}
                                  >
                                  {!attribute.required && <option
                                    key='null'
                                    value='null'
                                  >
                                  </option>
                                  }
                                  {Array.isArray(attribute.options) && attribute.options.map(opt => (
                                    <option
                                      key={opt}
                                      value={opt}
                                    >
                                      {opt}
                                    </option>
                                  ))}
                                  {!Array.isArray(attribute.options) && Object.keys(attribute.options).map(key =>
                                    <option
                                    key={key}
                                    value={key}
                                    >
                                    {key}
                                    </option>
                                  )}

                                  </select>
                                  </div>
                        case 'multi_select':
                          {
                            let opt=[];
                            attribute.options.map((att)=>opt.push({id:attribute.options.indexOf(att),title:att}));
                          return <div class="form-group">
                            <MultiSelect
                              id={attribute.id}
                              data={opt}
                              displayValue="title"
                              selectedIds={this.state.task_data[attribute.id]}
                              idValue="id"
                              filterBy="title"
                              title= {attribute.title}
                              display="row"
                              displayBoxStyle={{width:100}}
                              menuItemStyle={{marginLeft:7,marginRight:7,marginTop:2,marginBottom:2,paddingTop:2,paddingBottom:2}}
                              renderItem={(item)=><span class="badge" style={{margin:'auto',border: '1px solid black',borderRadius:'3px',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5, marginLeft:5}}>{item.title}</span>}
                              titleStyle={{backgroundColor:'white',color:'black',size:15}}
                              toggleStyle={{backgroundColor:'white',border:'none',padding:0}}
                              label={attribute.title}
                              labelStyle={{marginLeft:10}}
                              searchStyle={{margin:5}}
                              onChange={(ids,items)=>{
                                let newData={...this.state.task_data};
                                newData[attribute.id]=ids;
                                this.setState({task_data:newData});
                              }}
                              />
                        </div>
                      }
                        case 'date':
                          return <div class="form-group">
                                    <label for={attribute.id}>{attribute.title}</label>
                                    <input
                                      class="form-control"
                                      type="datetime-local"
                                      id={attribute.id}
                                      value={this.state.task_data[attribute.id]}
                                      onChange={(e)=>{
                                        let newData={...this.state.task_data};
                                        newData[attribute.id]=e.target.value;
                                        this.setState({task_data:newData});
                                      }
                                    }
                                    placeholder={"Select "+attribute.title}
                                    />
                                  </div>
                        case 'decimal_number':
                        return <div class="form-group">
                          <label for={attribute.id}>{attribute.title}</label>
                          <input
                            class="form-control"
                            type="number"
                            id={attribute.id}
                            value={this.state.task_data[attribute.id]}
                            onChange={(e)=>{
                              let newData={...this.state.task_data};
                              newData[attribute.id]=e.target.value;
                              this.setState({task_data:newData});
                            }
                          }
                          placeholder={"Select "+attribute.title}
                          />
                        </div>
                      case 'integer_number':
                        return <div class="form-group">
                          <label for={attribute.id}>{attribute.title}</label>
                          <input
                            class="form-control"
                            type="number"
                            id={attribute.id}
                            value={this.state.task_data[attribute.id]}
                            onChange={(e)=>{
                              let newData={...this.state.task_data};
                              newData[attribute.id]=e.target.value;
                              this.setState({task_data:newData});
                            }
                          }
                          placeholder={"Select "+attribute.title}
                          />
                        </div>
                      case 'checkbox':
                        return <div class="form-check">
                            <label class="form-check-label">
                              <input type="checkbox" class="form-check-input" checked={this.state.task_data[attribute.id]}
                                onChange={()=>{
                                  let newData={...this.state.task_data};
                                  newData[attribute.id]=!newData[attribute.id];
                                  this.setState({task_data:newData});
                                }
                              }
                            />
                            {attribute.title}
                            </label>
                          </div>

                      default:
                        return <div>{attribute.title}</div>
                      }
                    })
                  }

                </form>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({tasksReducer,statusesReducer, companiesReducer, tagsReducer, unitsReducer, login,usersReducer}) => {
  const {task, taskProjects, taskAttributes, taskSolvers} = tasksReducer;
  const {statuses} = statusesReducer;
  const {companies} = companiesReducer;
  const {tags} = tagsReducer;
  const {units} = unitsReducer;
  const {users} = usersReducer;
  const {token} = login;
  return {task,taskProjects,companies,taskAttributes,statuses, tags, units, taskSolvers,users, token};
};


export default connect(mapStateToProps, {getTaskSolvers,deleteTaskSolvers,editTask})(EditTask);
