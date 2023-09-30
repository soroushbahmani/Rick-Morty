import React, { useEffect, useLayoutEffect, useState } from "react";

import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, Button, Pagination, Stack, TextField, Typography } from "@mui/material";
import { GET_CHARACTERS } from "../graphql/queries";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from './Error';
import { Search } from "@mui/icons-material";





export default function Characters() {
  const [page, set_page] = useState(1)
  const [input_text, set_input_text] = useState('')
  const [count, set_count] = useState(0)

  const [getCharacter, { loading, data, error }] = useLazyQuery(GET_CHARACTERS);


  const pageinationHandler = (event, pagenumber) => {
    set_page(pagenumber);
    getCharacter({ variables: { index: pagenumber ? pagenumber : page } })
  }

  const inputHandler = (e) => {
    set_input_text(e.target.value);
  }

  const searchHandler = () => {
    getCharacter({ variables: { index: 6, input: input_text } })

  }


  useEffect(() => {
    set_count(data?.characters?.info?.pages)
    getCharacter({ variables: { index: page, input: input_text } })
  }, [data])



  if (error) {
    return <Error message={error?.message} />
  };

  return (
    <>
      <Box pt={'100px'} pb={'50px'} justifyContent={'center'} alignItems={'center'}  display={'flex'}>
        <TextField sx={{
          "& .MuiInputBase-root": {
            color: 'primary.main'
          },
          "& .MuiFormLabel-root": {
            color: 'white'
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: 'white'
          },

          
        }} inputProps={{}} size="small" label="search" variant="filled" color="info" onInput={e => inputHandler(e)} />

        <Button variant="contained" sx={{ p: 1, mx: 2 }} size="large" onClick={searchHandler}>
          <Search />
        </Button>

      </Box>
      <Box pt={'50px'} pb={'100px'}>
        {
          loading ?
            <Loading /> : <>

              {
                Boolean(data?.characters?.results?.length) == true ?
                  <>
                    <Stack color={'white'}  spacing={{ xs: 2, sm: 5, lg: 10, xl: 10 }} direction="row" useFlexGap flexWrap="wrap" justifyContent={'space-evenly'} alignItems={'center'}>
                      {
                        data?.characters?.results.map(e =>
                          <Link key={e.id} style={{ color: 'white', textDecoration: 'none' }} to={`/Character/${e.id}`}>
                            <Stack width={'300px'} sx={{ borderRadius: '10px', overflow: 'hidden' }} bgcolor={'rgb(60, 62, 68)'}>
                              <img src={e.image} width={'100%'} alt="" />
                              <Box sx={{ padding: '20px' }}>
                                <Typography variant="h1" sx={{ py: 1 }}>
                                  {e.name}
                                </Typography>
                                <Stack direction={'row'} py={1} justifyContent={'start'} alignItems={'center'}>
                                  <Box height={'18px'} width={'18px'} sx={{ borderRadius: '100%', mr: '10px' }} bgcolor={e.status == 'Dead' ? 'rgb(214, 61, 46)' : '' || e.status == 'unknown' ? '#abb2bf' : '' || e.status == 'Alive' ? 'rgb(85, 204, 68)' : ''}></Box>
                                  <Typography variant="h2">
                                    {e.status}
                                  </Typography>
                                </Stack>
                                <Typography variant="h3" color={'rgb(158, 158, 158)'}>
                                  Last known location:
                                </Typography>
                                <Typography variant="h3" py={2} >
                                  {
                                    e.location.name
                                  }
                                </Typography>
                              </Box>
                            </Stack>
                          </Link>
                        )
                      }
                    </Stack>
                    <Box mt={'100px'} sx={{ py: 1, bgcolor: 'white', borderRadius: '10px', width: 'max-content', mx: 'auto' }}>
                      <Pagination count={count} page={page} color="primary" size="small" onChange={pageinationHandler} />
                    </Box>
                  </>
                  :
                  <Box width={'100vw'} height={'60vh'} justifyContent={'center'} alignItems={'center'} display={'flex'}>

                    <Typography color={'orange'} variant="h1">
                      No Character
                    </Typography>
                  </Box>
              }
            </>





        }



      </Box>
    </>

  );
}
