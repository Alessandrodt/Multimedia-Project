import { Link } from 'react-router-dom';
export const EditProfile = () =>{

    return (
    <div className='background-img'>
      <section class="notFound">
        <div class="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div class="text">
        <h1>OOPSIE DAISY!</h1>
        <h2>THIS PAGE IS NOT AVAILABLE YET!</h2>
        <h3>BACK TO HOME?</h3>
        <Link className='yes' to={`/home`}>YES</Link>
        <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo" target="_blank" rel="noreferrer" >NO</a>
        </div>
       </section>
    </div>
)}