import * as React from 'react';
import styles from './ItSecurirtyRoom.module.scss';
import { IItSecurirtyRoomProps } from './IItSecurirtyRoomProps';

import {Stack,IStackStyles,IChoiceGroupOption,ChoiceGroup} from 'office-ui-fabric-react'; 

import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import { DateTimePicker, DateConvention} from '@pnp/spfx-controls-react/lib/dateTimePicker';  

import {PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import {Icon} from 'office-ui-fabric-react/lib/Icon';

//import Service from './Service';

import Service1  from './Service1';



const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };

const RadioExp: IChoiceGroupOption[] = 

[  { key: "Quarterly", text: "Quarterly" , },  { key: "Monthly", text: "Monthly" },];  

let RootUrl = '';

let Envval='';

export interface ITSecurityFieldsState{

  QuarterListItems: any;
  MyQuarterValue:any;
  ReviewSpan:any;

  month:any;
  MonthListItems:any;
  MyMonthValue:any;

 
  country:any;
  CountryListItems:any;
  MyCountryValue:any;
  MyCountryText:any;

  City:any;
  CityListItems: any;
  MyCityValue:any;
  MyCityText:any;

  dtreqdate:Date;

  file:any;
  Enval:any;

  FileValue:any;
  disableFileUpload:boolean;

  divhidemonth:boolean;
  divhideQuarter:boolean;

  Environments:any;

}

export default class clsSecurityRoom extends React.Component<IItSecurirtyRoomProps, ITSecurityFieldsState> {
  public _service1: any;
  public GlobalService1: any;

  public constructor(props:IItSecurirtyRoomProps) {
    super(props);
    this.state={

      QuarterListItems: [],
      MyQuarterValue:null,
      ReviewSpan:"",
      
      Environments:[],
      
      MonthListItems:[],
      MyMonthValue:null,
      month:"",

      CountryListItems:[],
      MyCountryValue:null,
      MyCountryText:null,
      country:"",

      CityListItems:[],
      MyCityValue:null,
      City:"",
      MyCityText:"",

      dtreqdate:null,
      file:null,
      Enval:"",

      FileValue:[],
      disableFileUpload:false,

      divhidemonth:false,
      divhideQuarter:false


    };

    RootUrl = this.props.url;

    this._service1 = new Service1(this.props.url, this.props.context);
    
    this.GlobalService1 = new Service1(this.props.url, this.props.context);
    
    this.GetAllQuarters();

    this.GetAllMonths();

    this.GetAllCountries();

    this.GetEnvironment();
   

    console.log(RootUrl);

    console.log(Envval);
    

  }

  public async GetEnvironment()
  {

    var data = await this._service1.getEnvironment();

    console.log(data);

    var AllEnvironments: any = [];

    for (var k in data) {

      AllEnvironments.push({ key: data[k].ID, text: data[k].Title});

      Envval=data[0].Title;
    }

   
  }

  public async GetAllQuarters() {

   
    
    var data = await this._service1.GetAllQuarters();

    console.log(data);

    var AllQuarters: any = [];

    for (var k in data) {

      AllQuarters.push({ key: data[k].ID, text: data[k].Title});
    }

    console.log(AllQuarters);

    
   this.setState({ QuarterListItems: AllQuarters });
  

  }

  public async GetAllMonths() {

       
    var data = await this._service1.GetAllMonths();

    console.log(data);

    var AllMonths: any = [];

    for (var k in data) {

      AllMonths.push({ key: data[k].ID, text: data[k].Title});
    }

    console.log(AllMonths);

    
   this.setState({ MonthListItems: AllMonths });
  

  }

  public async GetAllCountries() {

        
    var data = await this._service1.GetAllCountries();

    console.log(data);

    var AllCountries: any = [];

    for (var k in data) {

      AllCountries.push({ key: data[k].ID, text: data[k].Title});
    }

    console.log(AllCountries);

    
   this.setState({ CountryListItems: AllCountries });
  

  }


  public ChangeSpan=async(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): Promise<void>=> {  

    this.setState({  
  
      ReviewSpan: option.key  
  
      });  

      if(option.key=='Quarterly')
      {

        this.setState({divhideQuarter:true})
        this.setState({divhidemonth:false})
      }

      else
      {

        this.setState({divhideQuarter:false})
        this.setState({divhidemonth:true})
      }

    
  }

  private handleQuarter(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
    this.setState({ MyQuarterValue:item.key });

    
  }
  
  private handleMonth(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
    this.setState({ MyMonthValue:item.key });

    
  }

 
  private handleCountry(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    if (this.state.CityListItems.length > 0) {

       CityListItems: [];

      this.setState({ CityListItems: [] });
      
      this.setState({ MyCityValue: 'Select' });

    }

    this.GetCityData(item.text);
    this.setState({ MyCountryValue: item.key });

    console.log(this.state.MyCityValue);



    
  }

  private handleCity(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
    this.setState({ MyCityValue:item.key });

    
  }

  private async GetCityData(SelCountryVal: string) {

    var myCityLocal: any = [];

    
     
    var data = await this._service1.MyGetCityData(SelCountryVal);

    var AllCities: any = [];

    let CityLevel = data[0].City;

    let arr = CityLevel.split(',')

    for (var k in arr) {
      AllCities.push({ key: arr[k], text: arr[k] });
    }

    console.log(AllCities);

    

    AllCities.map((item:any) => {
      let Itemexsits = false;

      if (myCityLocal != null) {
        if (myCityLocal && myCityLocal.length > 0) {

          myCityLocal.map((ditem:any) => {
            if (ditem.key === item.key) {

              Itemexsits = true;
            }

          });
        }

        if (!Itemexsits) {

          myCityLocal.push({ key: item.key, text: item.text });
        }

      }
    });

    
    this.setState({ CityListItems: myCityLocal });

  }


  public changeCountry=async(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): Promise<void>=> {  

    this.setState({  
  
      country: option.key  
  
      });  

    
  }

  public handleRequestDateChange = (date: any) => {

    this.setState({ dtreqdate: date });

    }

    private OnBtnClick():void{

      if(this.state.ReviewSpan=='')
      {

        alert('Please Select Review Span')
      }

      
      if(this.state.ReviewSpan=='Quarterly')
      {

        if(this.state.MyQuarterValue == null  || this.state.MyQuarterValue == 'Select Quarter')
        {

          alert('Please Select Quarter')

        }

        else if(this.state.MyCountryValue == null  || this.state.MyCountryValue == '1' || this.state.MyCountryValue == 'Select Country')
        {

          alert('Please Select Country')

        }

        else if(this.state.MyCityValue == null  || this.state.MyCityValue == '1' || this.state.MyCityValue == 'Select City')
        {

          alert('Please Select City')

        }

        else if(this.state.dtreqdate==null)
        {
    
          alert('please select DueDate');
        }

        else if(this.state.FileValue.length==0)
        {
         
          alert('please select any file');
        }
    

        else
        {

let date1=(this.state.dtreqdate.getDate()+1);

console.log(date1);

let month1= (this.state.dtreqdate.getMonth()+1);

let year1 =(this.state.dtreqdate.getFullYear());

let FinalRequestDelDate=month1+'/'+this.state.dtreqdate.getDate() +'/' +year1;

          

          let myfiles=[];

          for(var count=0;count<this.state.FileValue.length;count++)
          {
            
            myfiles.push(this.state.FileValue[count]);
          }

          this._service1.onDrop(this.state.ReviewSpan,this.state.MyQuarterValue,this.state.MyCountryValue,this.state.MyCityValue,FinalRequestDelDate,myfiles).then(function (data:any)
          {
      
            console.log(data);

            alert('Record submitted successfully');
            window.location.replace(Envval);
      
      
          });
              



        }

        
      }

      if(this.state.ReviewSpan=='Monthly')
      {


        if(this.state.MyMonthValue == null  || this.state.MyMonthValue == '1' || this.state.MyMonthValue == 'Select Month')
        {

          alert('Please Select Month')

        }

        else if(this.state.MyCountryValue == null  || this.state.MyCountryValue == 'Select Country')
        {

          alert('Please Select Country')

        }

        else if(this.state.MyCityValue == null  || this.state.MyCityValue == '1' || this.state.MyCityValue == 'Select City')
        {

          alert('Please Select City')

        }

        else if(this.state.dtreqdate==null)
        {
    
          alert('please select DueDate');
        }

        else if(this.state.FileValue.length==0)
        {
         
          alert('please select any file');
        }
    

        else
        {

          let date1=(this.state.dtreqdate.getDate()+1);

console.log(date1);

let month1= (this.state.dtreqdate.getMonth()+1);

let year1 =(this.state.dtreqdate.getFullYear());

let FinalRequestDelDate=month1+'/'+this.state.dtreqdate.getDate() +'/' +year1;

          

          let myfiles=[];

          for(var count=0;count<this.state.FileValue.length;count++)
          {
            
            myfiles.push(this.state.FileValue[count]);
          }

          this._service1.onDrop1(this.state.ReviewSpan,this.state.MyMonthValue,this.state.MyCountryValue,this.state.MyCityValue,FinalRequestDelDate,myfiles).then(function (data:any)
          {
      
            console.log(data);
      
            alert('Record submitted successfully');
      
           window.location.replace(Envval);
      
            
      
      
          });
        }

        
      }

      

    


    }

 
    private _removeItemFromDetail(Item: any) {
      console.log("itemId: " + Item.name); 
    
     let localFileValues=[];
    
     localFileValues=this.state.FileValue;
    
     if(localFileValues.length==1)
     {
    
      localFileValues=[];
     }
    
    
      for(var count=0;count<localFileValues.length;count++)
      {
    
        if(localFileValues[count].name==Item.name)
          {
            let Index=count;
    
            localFileValues.splice(Index,count);
    
          }
    
      }
    
      this.setState({FileValue:localFileValues,disableFileUpload:false});
    
    
    }


    private changeFileupload(data: any) {

      let LocalFileVal= this.state.FileValue;
      
       LocalFileVal.push(data.target.files[0]);
      
      
      this.setState({FileValue:LocalFileVal});
      
      if(this.state.FileValue.length>4)
      {
      this.setState({disableFileUpload:true});
      
      }
      
      
      }


  public render(): React.ReactElement<IItSecurirtyRoomProps> {
 
    return (
      <Stack tokens={stackTokens} styles={stackStyles} >
      <Stack>
      <b><label className={styles.labelsFonts}>Security Review Span <label className={styles.recolorss}>*</label></label></b><br/>  
      
      <ChoiceGroup className={styles.onlyFont}  options={RadioExp} onChange={this.ChangeSpan}/> <br></br>

  {this.state.divhideQuarter == true &&  

<div id="divQuarter"> 
      
<b><label className={styles.labelsFonts}>Quarter <label className={styles.recolorss}>*</label></label></b>
<br></br>
<Dropdown className={styles.onlyFont}
                placeholder="Select  Quarter"
                options={this.state.QuarterListItems}
                styles={dropdownStyles}
                selectedKey={this.state.MyQuarterValue ? this.state.MyQuarterValue : undefined} onChange={this.handleQuarter.bind(this)}/>
                <br></br>
 </div>

      }

{this.state.divhidemonth == true &&  


<div>

<b><label className={styles.labelsFonts}>Month <label className={styles.recolorss}>*</label></label></b>
<br></br>
            
<Dropdown className={styles.onlyFont}
          placeholder="Select  Month"
          options={this.state.MonthListItems}
          styles={dropdownStyles}
          selectedKey={this.state.MyMonthValue ? this.state.MyMonthValue : undefined} onChange={this.handleMonth.bind(this)}/>
          <br></br>

</div>

  }



        <b><label className={styles.labelsFonts}>Property Country <label className={styles.recolorss}>*</label></label></b><br/>  

        <Dropdown className={styles.onlyFont}
          placeholder="Select  Country"
          options={this.state.CountryListItems}
          styles={dropdownStyles}
          selectedKey={this.state.MyCountryValue ? this.state.MyCountryValue : undefined} onChange={this.handleCountry.bind(this)}/>
          <br></br>

          <b><label className={styles.labelsFonts}>Property City <label className={styles.recolorss}>*</label></label></b><br/>  
          <Dropdown placeHolder="Select City" options={this.state.CityListItems} styles={dropdownStyles} selectedKey={this.state.MyCityValue ? this.state.MyCityValue : undefined} onChange={this.handleCity.bind(this)}/><br></br>

          <b><label className={styles.labelsFonts}>Requested Due Date <label className={styles.recolorss}>*</label></label></b><br/>
             <div className={styles.welcome}>
           <DateTimePicker  
          dateConvention={DateConvention.Date}  
          showLabels={false}
          value={this.state.dtreqdate}  
          onChange={this.handleRequestDateChange}
           />  
        </div><br></br>

        {/* <b><label className={styles.labelsFonts}>Upload Access Report <label className={styles.recolorss}>*</label></label></b><br/>
        <input type="file" name="file" onChange={this.fileChangeHandler.bind(this)} accept=".xlsx"/>
        <br></br> */}

<b><label className={styles.labelsFonts}>Upload Access Report <label className={styles.recolorss}>*</label></label></b><br/>

<div> 
  
  <input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileupload.bind(this)} disabled={this.state.disableFileUpload}/>

 
   {this.state.FileValue.map((item:any,index:any) =>(

    <div className={styles.padcss}>  
    
    {item.name} <Icon iconName='Delete'  onClick={(event:any) => {this._removeItemFromDetail(item)}}/>

    </div>
     

))}

        </div>

        <br>
        </br>
        <PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage}/>

      </Stack>
      </Stack>
    );
  }
}
