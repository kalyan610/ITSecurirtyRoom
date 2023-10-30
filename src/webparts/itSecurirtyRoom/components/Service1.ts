import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }

public async test123():Promise<any>
{

    console.log('test')

    this.onDrop('','','','','','');

    this.onDrop1('','','','','','');
}

public async getEnvironment():Promise<any>
{

return await sp.web.lists.getByTitle("Environment").items.select('Title','ID').expand().get().then(function (data:any) {
 
return data;

});

}

    public async GetAllCountries():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Countries").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

    public async GetAllQuarters():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Quarters").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

    public async GetAllMonths():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Months").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }


    public async MyGetCityData(SelCounVal: string):Promise<any>
    {
 
     let filtercondition: any = "(Title eq '" + SelCounVal + "')";
 
     return await  sp.web.lists.getByTitle("Cities").items.select('City').filter(filtercondition).get().then(function (data) {
 
     return data;
 
     });
 
    }

    
    private async onDrop (MySpan:string,MyQuarterVal:string,MyCountryVal:string,MyCityVal:string,MyDate:string,acceptedFiles:any)  {

        let Myval='Completed';
    
        try
        {

          let file=acceptedFiles;
    
          let Varmyval= await sp.web.lists.getByTitle("ITSecurityRoomDetails").items.add({
    
            ReviewSpan:MySpan,
            QuarterId:MyQuarterVal,
            CountryId:MyCountryVal,
            City:MyCityVal,
            Title: "Request Created",
            RequestDate:MyDate
          
    
        }).then (async r => {
          // this will add an attachment to the item we just created to push t sharepoint list
    
        for(var count=0;count<file.length;count++)
        {
         await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
        console.log(result);
    
          })
    
        }
    
        return Myval;
    
    
    
        })
    
        
    
        return Varmyval;
    
        
      }
    
    
    
      catch (error) {
        console.log(error);
      }
    
    
      
     }


     private async onDrop1 (MySpan:string,MyMonthVal:string,MyCountryVal:string,MyCityVal:string,MyDate:string,acceptedFiles:any)  {

        let Myval='Completed';
    
        try
        {

          let file=acceptedFiles;
    
          let Varmyval= await sp.web.lists.getByTitle("ITSecurityRoomDetails").items.add({
    
            ReviewSpan:MySpan,
            MonthId:MyMonthVal,
            CountryId:MyCountryVal,
            City:MyCityVal,
            Title: "Request Created",
            RequestDate:MyDate
          
    
        }).then (async r => {
          // this will add an attachment to the item we just created to push t sharepoint list
    
        for(var count=0;count<file.length;count++)
        {
         await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
        console.log(result);
    
          })
    
        }
    
        return Myval;
    
    
    
        })
    
        
    
        return Varmyval;
    
        
      }
    
    
    
      catch (error) {
        console.log(error);
      }
    
    
      
     }
     
     

   

}