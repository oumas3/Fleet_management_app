import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack,} from '@chakra-ui/react';
import Dash from '../../components/admin/dash'


export default function InsuranceForm() {
    const navigate = useNavigate();
    const [company, setCompany] = useState('');
    const [num, setNum] = useState('');
    const [sDate, setSdate] = useState('');
    const [eDate, setEdate] = useState('');
    const [vehicleList, setVehicleList] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/vehicle').then((response) => {
            setVehicleList(response.data.data);
        });
    }, []);

    const handleVehicleChange = (event) => {
        setSelectedVehicleId(event.target.options[event.target.selectedIndex].value);
    };


    const createInsurance = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ID_VEHICLE', selectedVehicleId);
        formData.append('INSURANCE_COMPANY', company);
        formData.append('INSURANCE_NUMBER', num);
        formData.append('START_DATE', sDate);
        formData.append('EXPIRATION_DATE', eDate);


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/insurance', formData);
            console.log(response.data.message);
            navigate('/dashboard/insurance');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else {
                console.log(error.message);
            }
        }
    };


    return (
        <Dash>
            <Box
                bg={'white'}
                boxShadow={'lg'}
                rounded={'lg'}
                p={6}
                m="6"
                mt="24"
                textAlign={'center'}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Add a insurance</Heading>
                </Stack>
                <form onSubmit={createInsurance}>
                    <Stack spacing={4} mt={10}>
                        <FormControl id="vehicleId">
                            <FormLabel>Vehicle ID</FormLabel>
                            <Select
                                value={selectedVehicleId}
                                onChange={handleVehicleChange}
                                placeholder="Select a vehicle"
                            >
                                {vehicleList.map((vehicle) => (
                                    <option key={vehicle.ID_VEHICLE} value={vehicle.ID_VEHICLE}>
                                        {vehicle.ID_VEHICLE}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Insurance Company</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter insurance company"
                                value={company}
                                onChange={(e) => {
                                    setCompany(e.target.value)
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Insurance Number</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter insurance number"
                                value={num}
                                onChange={(e) => {
                                    setNum(e.target.value)
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                placeholder="Enter start date"
                                value={sDate}
                                onChange={(e) => {
                                    setSdate(e.target.value)
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Expiration Date</FormLabel>
                            <Input
                                type="date"
                                placeholder="Enter expiration date"
                                value={eDate}
                                onChange={(e) => {
                                    setEdate(e.target.value)
                                }}
                            />
                        </FormControl>
                        <Stack
                            spacing={10}
                            direction={{base: 'column', sm: 'row'}}
                            align={'center'}
                            justify={'center'}
                            mt={6}
                        >
                            <Button
                                type="submit"
                                w={{base: 'full', sm: 'auto'}}
                                bg={'red.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'red.500',
                                }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Dash>
    );
}
