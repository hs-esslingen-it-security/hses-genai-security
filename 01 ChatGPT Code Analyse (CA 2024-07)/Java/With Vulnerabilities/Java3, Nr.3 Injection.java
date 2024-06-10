import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class ImageHandler {

    private void initialize() {
        System.out.println("Initializing ImageHandler...");
    }

    private boolean validateInput(String input) {
        return input != null && !input.isEmpty();
    }

    protected void imageName(String img) throws IOException {
        String imgname = img;

        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("javascript");
        engine.eval("print('" + imgname + "')");
    }

    public void handleRequest(HttpServletRequest request) {
        String imgParameter = request.getParameter("img");
        if (validateInput(imgParameter)) {
            try {
                imageName(imgParameter);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        ImageHandler handler = new ImageHandler();
        handler.initialize();
        HttpServletRequest request = null;
        handler.handleRequest(request);
    }
}
