import {useState,useEffect} from 'react'
import axios from 'axios'

function PdfFile(){

    const [out,setOut] = useState(null)
    // Create a useEffect Hook to call fetch data from server
    useEffect(()=>{
        getData()
    },[])

    // GET request to fetch details from server using axios

    const getData = async() => {
        const getUser = await axios.get('http://localhost:3001/details')
        console.log(getUser.data.data);
        setOut(getUser.data.data)
    }

    // To show PDF file
    const showPdf = (resume)=>{
        window.open(`http://localhost:3001/files/${resume}`,"_blank","noreferrer")
      }

    return(
        <div className="uploaded">
          <h4>Uploaded PDF</h4>
          <div className="output-div">
          {out == null
            ? ""
            : out.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.resume}</h6>
                    <button
                      className="btn btn-primary" onClick={
                        ()=>showPdf(data.id)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
    )

}
export default PdfFile;