import close from "../../images/close.png";

export const DettagioImg = () => {

    return (
        <>
            <div className="external-box">
                <div className="gutter-box"></div>
                <div className="inner-box">
                    <div className="img-box">
                    </div>
                    <div className="info-external-box">
                        <div className="exit-button-box">
                            <button className="exit-button">
                            <img className="icong" src={close} title="Profilo" alt="company logo" />
                            </button>
                        </div>
                        <div className="tag-box">
                            <div className="text-box">
                             <div className="title-box">
                                    #Tag
                                 </div>
                             </div>   
                         
                        </div>
                        <div className="description-box">
                            <div className="text-box">
                            <div className="title-box">
                                    Description
                                </div>
                            
                             </div>
                        </div>
                        <div className="external-button-box">
                            <div className="button-box-sx">
                                <button className="button-action">Modify</button>
                            </div>  
                            <div className="button-box">
                                <button className="button-action">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gutter-box"></div>
            </div>
        </>
    )
}