package czhmisaka.tasklist.tasklistservice.storage;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@RestController
@RequestMapping("/task")
public class Storage {
    

    @RequestMapping("/add")
    public String addTaskToTaskList(){
        return "Hello World";
    };
    
    @RequestMapping("/set")
    public String setTaskInTaskList(){
        return "setTask";
    };

    @PostMapping("/delete")
    public String deleteTaskInTaskListById(){
        return "asd";
    };


}