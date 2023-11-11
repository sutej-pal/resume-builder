import { useEffect, useState } from 'react';
import './styles.scss';
import axios from "axios";
import PdfViewer from '../../components/pdf-viewer/pdf-viewer.component';
import RBForm from '../../components/rb-form.component';

function ResumeBuilder() {

    const [pdfBlob, setPDFBlob] = useState<any>();
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        getPDF();
    }, []);

    const getPDF = async () => {
        try {
            const resp = await axios.get('http://localhost:4000/api/pdf/generate-pdf', {
                responseType: 'blob'
            });
            // resp.data.arrayBuffer().then((arrayBuffer: any) => {
            setPDFBlob(resp.data);
            setReady(true);
            // });
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-md-6">
                    <RBForm />
                </div>
                <div className="col-md-6">
                    {ready ? <PdfViewer pdfBlob={pdfBlob} /> : ''}
                </div>
            </div>
        </div >
    )
}

export default ResumeBuilder