import React, { Fragment } from "react";

import CreateGroup from "./CreateGroup";
import InviteList from "./InviteList";
const drawerWidth =240;
  

function CreateGroupDashboard()  {

  

    return(

        <Fragment>
          <CreateGroup />
          <InviteList />
        </Fragment>

      
    
    );
}

export default CreateGroupDashboard;