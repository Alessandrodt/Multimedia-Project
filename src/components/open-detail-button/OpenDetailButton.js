import { DettaglioImg} from "../dettaglio-img/DettaglioImg"
import { render } from "@testing-library/react";
import { state } from 'react'; 
import { toggleComponent } from 'react'; 


export function ButtonChange() { 
  
    state = { 
        isComponentVisible: false 
      } 
       
      toggleComponent = () => { 
          this.setState({ 
              isComponentVisible: !this.state.isComponentVisible 
          }); 
      } 
       
    render()
    { 
       return( 
         <div> 
           <button onClick={this.toggleComponent}>  
               Toggle Component  
            </button> 
           {this.state.isComponentVisible ? <DettaglioImg/> : null} 
         </div> 
       ) 
      } 
  
}