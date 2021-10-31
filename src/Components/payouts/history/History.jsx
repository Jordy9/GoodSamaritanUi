import React from 'react'

export const History = () => {
    return (
        <>
            <div className = 'row'>
            <div className="col-12">
                <div className="card border-dark" style = {{overflowY: 'auto', height: '550px', border: 'none'}}>
                    <div className="card-body">
                        <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">Identificación</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Escribe</th>
                            <th scope="col">Creado en</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                            <tr>
                            <th scope="row">6</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
