import React from 'react'
import RadioBonaoBendi from '../../../heroes/BonaoBendicionn.jpg'

export const RadioBonaoBlessing = () => {
    
    const RadioBonaoBendicion = 'http://178.33.166.7:7504/;stream.nsv'

    return (
        <div className='container'>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center flex-column mt-5">
                    <div className="shadow bg-dark p-3 mb-3">
                        <img src={RadioBonaoBendi} className='img-fluid rounded' style={{height: '250px', width: '100vw'}} alt="" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center">
                    <audio controls autoPlay src={RadioBonaoBendicion}></audio>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center mt-3">
                    <iframe title='RadioBonaoBendicion' src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fradiobonaobendicio&width=255&layout=button_count&action=like&size=large&share=true&height=46&appId" width="255" height="46" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center">
                    <div className="shadow bg-dark p-3 mb-3">
                        <iframe title='RadioBonaoBendicion' src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fradiobonaobendicio&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
