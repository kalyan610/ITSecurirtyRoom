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

   

}