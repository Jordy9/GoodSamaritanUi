import React from "react"
import { Ticker } from 'react-tradingview-embed'

export const Cards = () => {
    return (
        <>
            <div className = 'row'>
                <Ticker widgetPropsAny={{"newProp": true, 'width': 710, 'height': '185'}} />
                <div className = 'col-3 mt-3'>
                    <div className="card text-dark bg-light mb-3" style = {{boxShadow: '0px 0px 3px 0px'}}>
                        <div className="card-header bg-dark" style = {{color: 'white'}}>SALDO DE BILLETERA</div>
                        <div className="card-body">
                            <p className="card-text text-muted" style = {{fontSize: '30px'}}><i className="bi bi-wallet2" style = {{color: 'black'}}> </i>99.77 TRX</p>
                    </div>        
                    </div>
                </div>

                <div className="col-3 mt-3">
                    <div className="card text-dark bg-light mb-3" style = {{boxShadow: '0px 0px 3px 0px'}}>
                        <div className="card-header bg-dark" style = {{color: 'white'}}>RECOMPENSAS TOTALES</div>
                            <div className="card-body">
                                <p className="card-text text-muted" style = {{fontSize: '30px'}}><i className="bi bi-trophy" style = {{color: '#efb810'}}> </i>19242.23 TRX</p>
                            </div>        
                    </div>
                </div>
                            
                <div className="col-3 mt-3">
                    <div className="card text-dark bg-light mb-3" style = {{boxShadow: '0px 0px 3px 0px'}}>
                        <div className="card-header bg-dark" style = {{color: 'white'}}>TOTAL DIARIO</div>
                        <div className="card-body">
                            <p className="card-text text-muted" style = {{fontSize: '30px'}}><i className="bi bi-cash-stack" style = {{color: 'green'}}> </i>712.23 TRX</p>
                    </div>        
                    </div> 
                </div>    

                <div className="col-3 mt-3">
                    <div className="card text-dark bg-light mb-3" style = {{boxShadow: '0px 0px 3px 0px'}}>
                        <div className="card-header bg-dark" style = {{color: 'white'}}>TIPO DE CUENTA</div>
                        <div className="card-body">
                            <p className="card-text text-muted" style = {{fontSize: '30px'}}><i className="bi bi-clipboard-data" style = {{color: 'black'}}> </i>Normal</p>
                    </div>        
                    </div> 
                </div>    
            </div>
        </>
    )
}
