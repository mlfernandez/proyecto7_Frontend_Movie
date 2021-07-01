import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import './Faq.scss';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;



const Faq = () => {

    

    const callback = (key)  => {
      console.log(key);
    }
    
    const text1 = `
    Smile es un servicio de streaming que ofrece una amplia variedad de series, películas, títulos de anime, documentales y otros contenidos premiados..

    Puedes ver todo el contenido que quieras, cuando quieras y sin un solo anuncio por una tarifa mensual reducida. ¡Siempre hay algo nuevo que descubrir, y cada semana se añaden nuevas películas!
`;

    const text2 = `
    Disfruta de Smile por una tarifa mensual fija de 130 € al año. Sin cargos adicionales ni contratos.`;

    
    const text3 = `
    Smile dispone de una amplia biblioteca de originales de Smile galardonados, títulos de anime, series de TV, documentales, largometrajes y otros contenidos. Ve todo el contenido que quieras, cuando quieras.`;


    return (
        <div>
            <Collapse
                bordered={false}
                defaultActiveKey={['1', '2', '3']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel header="¿Que es Smile?" key="1" className="site-collapse-custom-panel">
                <p>{text1}</p>
                </Panel>
                <Panel header="¿Cuánto cuesta Smile?" key="2" className="site-collapse-custom-panel">
                <p>{text2}</p>
                </Panel>
                <Panel header="¿Qué puedo ver en Smile?" key="3" className="site-collapse-custom-panel">
                <p>{text3}</p>
                </Panel>
            </Collapse>

      </div>
    )
    
    }
export default Faq;