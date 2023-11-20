import { useEffect, useState } from 'react';
import './styles.scss';
import axios from "axios";
import PdfViewer from '../../components/pdf-viewer/pdf-viewer.component';
import RBForm from '../../components/rb-form.component';
import { getResume } from '../../services/user.service';

function ResumeBuilder() {

    const [pdfBlob, setPDFBlob] = useState<any>();
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        getPDF();
    }, []);

    const getPDF = async () => {
        try {
            const resp = await getResume('655a3f86f16b25f76eeb4864');
            setPDFBlob(resp);
            setReady(true);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-md-6">
                    <RBForm fetchResume={getPDF} />
                </div>
                <div className="col-md-6 d-flex justify-content-center flex-column" style={{ backgroundColor: 'rgb(101, 110, 131)' }}>
                    {ready ? <PdfViewer pdfBlob={pdfBlob} /> : null}
                </div>
            </div>
        </div >
    )
}

export default ResumeBuilder