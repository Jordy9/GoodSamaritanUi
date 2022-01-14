import React, { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Slider from 'react-slick'
import { ContentBiliever } from './ContentBiliever'
import { Discipleship } from './Discipleship'
import { Tracking } from './Tracking'

export const ModalBileve = () => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    const ShowNow = localStorage.getItem('Show')

    const [Show, setShow] = useState(!ShowNow)

    useEffect(() => {
        if (!ShowNow) {
            setTimeout(() => {
                // setShow(true)
            }, 1500);
            if (Show === false) {
                localStorage.setItem('Show', false)
            } else {
                setTimeout(() => {
                    localStorage.setItem('Show', false)
                }, 1000 * 500);}
        }
        if (Show === false) {
            setShow(false)
        }
    }, [Show, ShowNow])

    return (
        <>
            <Modal
                contentClassName='bg-dark'
                centered
                size="xl"
                show={Show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body> 
                <div className="row">
                    <Slider {...settings}>
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <ContentBiliever />
                      </div>
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <Discipleship />
                      </div>
                      <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                        <Tracking />
                      </div>
                      {/* <div className='col-12'>
                        <img src="https://source.unsplash.com/I1ASdgphUH4/800x599" className="d-block w-100" style={{width: '500px', height: '800px'}} alt="" />
                      </div> */}
                    </Slider>
                  </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
