package demo.desk;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.time.LocalDate;
@SpringBootApplication
public class DeskApplication {
 public static void main(String[] args) { SpringApplication.run(DeskApplication.class,args); }
 @Bean CommandLineRunner seed(DeskRepository repo) {
  return args -> { if (repo.all().isEmpty()) {
  repo.insert("1",new DeskRecord.Input("Aurore morning crossings","Mobility survey team","Walking and cycling","Scheduled","Aurore / 08:00–08:30",LocalDate.now().plusDays(2),"Brief a result only once the observation window and a note on limitations are recorded.",85));
  repo.insert("2",new DeskRecord.Input("Riches Claires access sweep","School travel team","Vehicle access","Observed","Riches Claires / 15:00–15:30",LocalDate.now().plusDays(6),"Brief a result only once the observation window and a note on limitations are recorded.",22));
  repo.insert("3",new DeskRecord.Input("Triangle parent feedback","District consultation","Neighbour feedback","Briefed","Triangle / workshop",LocalDate.now().plusDays(10),"Brief a result only once the observation window and a note on limitations are recorded.",16));
  repo.insert("4",new DeskRecord.Input("Marais cycle arrival count","Mobility survey team","Walking and cycling","Scheduled","Marais / 08:15–08:45",LocalDate.now().plusDays(14),"Brief a result only once the observation window and a note on limitations are recorded.",112));
  repo.insert("5",new DeskRecord.Input("Laeken delivery access","School travel team","Vehicle access","Observed","Laeken / 12:00–12:30",LocalDate.now().plusDays(18),"Brief a result only once the observation window and a note on limitations are recorded.",10));
  repo.insert("6",new DeskRecord.Input("Flandre resident feedback","District consultation","Neighbour feedback","Briefed","Flandre / open evening",LocalDate.now().plusDays(22),"Brief a result only once the observation window and a note on limitations are recorded.",19));
  }};
 }
}
