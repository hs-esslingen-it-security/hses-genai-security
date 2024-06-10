import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.servlet.http.HttpServletRequest;

public class MyApplication {

    public static void initializeApp() {
        System.out.println("Initializing application...");
    }

    public static void processInputParameters(HttpServletRequest request) {
        String userInput = request.getParameter("userInput");
        System.out.println("Processing input: " + userInput);
    }

    public static void main(HttpServletRequest request) throws IOException {
        String file = request.getParameter("file");
        Process process = Runtime.getRuntime().exec("cmd.exe /C type " + file);
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));

        String s = null;
        while ((s = stdInput.readLine()) != null) {
            System.out.println(s);
        }
    }

    public static void outputResults(String result) {
        System.out.println("Result: " + result);
    }

    public static void main(String[] args) {
        initializeApp();
        HttpServletRequest request = null;
        processInputParameters(request);
    }
}
