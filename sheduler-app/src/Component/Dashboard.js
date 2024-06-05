import { Paper } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useNavigate } from "react-router-dom";
export function Dashboard(){
     const navigate = useNavigate();
     const handleReport=()=>{
           "hiii"
     }
      return(
        <>
             <Container className="mt-5">
                  <h1 style={{ paddingInlineStart: "4px", paddingBottom: "8px" }} className="heading text-center">Select a Social Platform</h1>
                  <Row>
                  <Col lg={2}></Col>
                     <Col lg={3}>
                        <Paper elevation={2} className="p-3 m-2 paperhome" style={{ display: 'flex', alignItems: 'center' }} >
                           <h5 style={{ flex: 1, marginRight: 'auto' }} onClick={()=>navigate('/fb-post')}>fb</h5>
                           <ArrowForwardIosOutlinedIcon style={{ color: "blue" }} />
                        </Paper>
                     </Col>
                     <Col lg={3}>
                        <Paper elevation={2} className="p-3 m-2 paperhome" style={{ display: 'flex', alignItems: 'center' }}>
                           <h5 style={{ flex: 1, marginRight: 'auto' }} onClick={()=>navigate('/twitter-post')}>Twitter</h5>
                           <ArrowForwardIosOutlinedIcon style={{ color: "blue" }} />
                        </Paper>
                     </Col>
                     <Col lg={3}>
                        <Paper elevation={2} className="p-3 m-2 paperhome" style={{ display: 'flex', alignItems: 'center' }}>
                           <h5 style={{ flex: 1, marginRight: 'auto' }} onClick={()=>navigate('/all-post')}>All</h5>
                           <ArrowForwardIosOutlinedIcon style={{ color: "blue" }} />
                        </Paper>
                     </Col>
                 
                  </Row>
               </Container>
        
        </>
      )
}