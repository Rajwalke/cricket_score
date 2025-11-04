import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const teamInfoSlice=createSlice({
    name:"teaminfo",
    initialState:{
        team1Info:[],
        team2info:[
            // {
            //         id:0,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:1,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:2,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:3,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:4,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:5,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:6,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:7,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },{
            //         id:8,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:9,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:10,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     },
            //     {
            //         id:11,
            //         playerName:'',
            //         four:0,
            //         six:0,
            //         runs:0,
            //         wicket:0,
            //         over:0
            //     }
        ],
        toss:{
            team:'',
            chossto:'',
            overs:0,
        },
        currentBowlerScore:[0],
        currentBatBallStatus:{
            batting:'',
            bowling:''
        },
        bastman1:{
            four:0,
            six:0,
            runs:0
        },
        bastman2:{
            four:0,
            six:0,
            runs:0
        },
        inning1Score:{
            runs:0,
            wicket:0,
            overs:0,
            balls:0,
        },
        
    },
    reducers:{
        updateInningScore1:(state,action)=>{
            const{parameter,value}=action.payload;
            if(state.inning1Score.balls===6){
                state.inning1Score.balls=0;
            }

            if(parameter==='runs'){
                 if(value==='WD' || value==='NO' ){
                    state.inning1Score.runs+=1;
                }else if(value==='WK'){
                    state.inning1Score.wicket+=1;
                    state.inning1Score.balls+=1;
                }else{
                    state.inning1Score.runs+=Number(value);
                    state.inning1Score.balls+=1;
                }
            }
            else{
                state.inning1Score.overs=value;
                // state.inning1Score.balls=0;
            }
        },
        updateCurrentBatballStatus:(state,action)=>{
            if(state.currentBatBallStatus.batting==='team1'){
                state.currentBatBallStatus.batting='team2';
                state.currentBatBallStatus.bowling='team1'
            }else{
                state.currentBatBallStatus.batting='team1';
                state.currentBatBallStatus.bowling='team2'
            }
        },
        updateBowlerOver:(state,action)=>{
            const id=action.payload;

            if(state.currentBatBallStatus.bowling ==='team2'){
                const playerInfo=state.team2info.find((p)=>p.id===id);
                playerInfo.over+=1;
            }else{
                const playerInfo=state.team1Info.find((p)=>p.id===id);
                playerInfo.over+=1
            }
            
        },
       updateBatsmanRun:(state,action)=>{
        const {id,value}=action.payload;

        if(state.currentBowlerScore.length>1){
                if(state.currentBatBallStatus.batting==='team1'){
                // team1 batsman score upadte
                const player=state.team1Info.find((p)=>p.id===id);
                // console.log("play1 name is",player);
                player.ballPlayed+=1;
                if(value==='WK'){
                    player.out=true;
                }else{
                    player.runs+=Number(value);
                    
                    if(Number(value)===4){
                        player.four+=1;
                    }else if(Number(value)===6){
                        player.six+=1;
                    }
                    
                }
                
            }else{
                // team2batsmanscore update
                const player=state.team2info.find((p)=>p.id===id);
                // console.log("play2 name is",player);
                player.ballPlayed+=1;
                if(value==='WK'){
                    player.out=true;
                }else{
                    player.runs+=Number(value);
                    if(Number(value)===4){
                        player.four=+1;
                    }else if(Number(value)===6){
                        player.six+=1;
                    }
                }
            }
        }
       },
        updateballinginfo:(state,action)=>{
            const {id,value}=action.payload;
            // let finalscore=value.reduce((acc, curr) => acc + curr, 0)
            if(state.currentBatBallStatus.bowling ==='team2'){
                // state.team2Info
                const player = state.team2info.find((p) => p.id === id);
                // let num=value.filter
                if(value==='WD' || value==='NO' ){
                    player.bowlingruns+=1;
                }else if(value==='WK'){
                    player.wicket+=1;
                }else{
                    player.bowlingruns+=Number(value);
                }
                
            }else{
                // state.team1Info
                const player = state.team1Info.find((p) => p.id === id);
                if(value==='WD' || value==='NO' ){
                    player.bowlingruns+=1;
                }else if(value==='WK'){
                    player.wicket+=1;
                }else{
                    player.bowlingruns+=Number(value);
                }
            }
        },
        updatecurrentBatBallStatus:(state,action)=>{
            const {bat,ball}=action.payload
            state.currentBatBallStatus.batting=bat;
            state.currentBatBallStatus.bowling=ball;
        },
        updateCurrentBowler:(state,action)=>{
            // const length=state.currentBowlerScore.length-1;
            // state.currentBowlerScore[length]=action.payload;
            // state.currentBowlerScore.push(0);
            const {index,value}=action.payload;
            
            if(index===state.currentBowlerScore.length-1){
                state.currentBowlerScore[index]=value;
                state.currentBowlerScore.push(0);
            }else{
                state.currentBowlerScore[index]=value;
            }
            
        },
        updateCurrentNewBowler:(state,action)=>{
            state.currentBowlerScore=[0];
        },
        addteam1:(state,action)=>{
            state.team1Info=[];
            for(let i=1;i<=action.payload;i++){
                state.team1Info.push({
                    id:i,
                    playerName:'',
                    four:0,
                    six:0,
                    runs:0,
                    wicket:0,
                    over:0,
                    out:false,
                    ballPlayed:0,
                    bowlingruns:0
                })
            }
        },
        updateuserName:(state,action)=>{
            const {index,value}=action.payload;
            const plyerinfo=state.team1Info[index];
            plyerinfo.playerName=value;
        },
        addteam2:(state,action)=>{
            state.team2info=[];
            for(let i=1;i<=action.payload;i++){
                state.team2info.push(
                {
                    id:i,
                    playerName:'',
                    four:0,
                    six:0,
                    runs:0,
                    wicket:0,
                    over:0,
                    out:false,
                    ballPlayed:0,
                    bowlingruns:0
                }
                )
            }
            
        },
        updateuserNameteam2:(state,action)=>{
            const {index,value}=action.payload;
            state.team2info[index].playerName=value;
        },
        updateToss:(state,action)=>{
            const {key,value}=action.payload;
            state.toss[key]=value;
        },
        


    }
});
export default teamInfoSlice.reducer;
export const {
    updateInningScore1,
    updateCurrentBatballStatus,
    updateBowlerOver,
    updateballinginfo,
    addteam1,
    updateuserName,
    addteam2,
    updateuserNameteam2,
    updateToss,
    updateCurrentBowler,
    updateCurrentNewBowler,
    updatecurrentBatBallStatus,
    updateBatsmanRun
}=teamInfoSlice.actions