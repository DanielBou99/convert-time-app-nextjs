"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { allTasks } from "./tasks";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Management() {
  const t = useTranslations("Management");

  const [branchsOnStaging, setBranchsOnStaging] = useState<any[]>([]);
  const [branchsToCab, setBranchToCab] = useState<any[]>([]);

  useEffect(() => {
    startCards();
  }, []);

  const startCards = () => {
    const allTasksWithDetailField = allTasks.map((task) => {
      let newTask: any = task;
      newTask.showDetails = false;
      return newTask;
    });
    setBranchsOnStaging(
      allTasksWithDetailField.filter((task) => task.status === 1)
    );
    setBranchToCab(allTasksWithDetailField.filter((task) => task.status === 2));
  };

  const searchTaskIndex = (id: number, tasks: any) => {
    return tasks.findIndex((tsk: any) => tsk.id === id);
  };

  const changeShowDetailCard = (task: any, allTasks: any, setter: any) => {
    const taskToChangeIndex = searchTaskIndex(task.id, allTasks);
    if (taskToChangeIndex !== -1) {
      const updatedBranchs = [...allTasks];
      updatedBranchs[taskToChangeIndex].showDetails =
        !updatedBranchs[taskToChangeIndex].showDetails;
      setter(updatedBranchs);
    }
  };

  const changeStatus = (task: any, newStatus: number) => {
    const taskToChangeIndex = searchTaskIndex(task.id, allTasks);
    if (taskToChangeIndex !== -1) {
      allTasks[taskToChangeIndex].status = newStatus;
      startCards();
    }
  };

  const createCard = (task: any, allTasks: any, setter: any) => {
    return (
      <Card sx={{ minWidth: 100, marginBottom: 2 }} key={task.id}>
        <CardContent>
          <Typography variant="h6" component="div">
            {task.branch}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            sx={{ justifyContent: "space-between" }}
          >
            <Box display="flex" alignItems="end">
              <Typography sx={{ mb: 1 }} color="text.secondary">
                {task.name}
              </Typography>
              <Tooltip title="Detalhes" enterTouchDelay={0} placement="right">
                <IconButton
                  onClick={() => changeShowDetailCard(task, allTasks, setter)}
                >
                  {!task.showDetails && <KeyboardArrowDownIcon />}
                  {task.showDetails && <KeyboardArrowUpIcon />}
                </IconButton>
              </Tooltip>
            </Box>
            {task.status === 1 && (
              <Tooltip title="Mover para CAB" enterTouchDelay={0} placement="top">
                <IconButton onClick={() => changeStatus(task, 2)}>
                  <ArrowForwardIcon></ArrowForwardIcon>
                </IconButton>
              </Tooltip>
            )}
            {task.status === 2 && (
              <Tooltip title="Mover para Staging" enterTouchDelay={0} placement="top">
                <IconButton onClick={() => changeStatus(task, 1)}>
                  <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {task.showDetails}
          {task.showDetails && (
            <div>
              <Typography variant="body2">{task.description}</Typography>
              <Box display="flex" alignItems="center">
                <Link href={task.jiraUrl} target="_blank">
                  <Button size="small">Jira</Button>
                </Link>
                <p>{task.gscId}</p>
              </Box>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>{t("title")}</h1>

          <Box display="flex" alignItems="top">
            <Box sx={{ minWidth: 300 }}>
              <section>
                <h2 style={{ textAlign: "center" }}>NA STAGING_20_07_23</h2>
                {branchsOnStaging.map((stg) => (
                  <div key={stg.id}>
                    {createCard(stg, branchsOnStaging, setBranchsOnStaging)}
                  </div>
                ))}
              </section>
            </Box>
            <Box sx={{ ml: 2, minWidth: 300 }}>
              <section>
                <h2 style={{ textAlign: "center" }}>ENVIAR PARA CAB</h2>
                {branchsToCab.map((stg) =>
                  createCard(stg, branchsToCab, setBranchToCab)
                )}
              </section>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
