import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.StringReader;
import org.xml.sax.InputSource;

public class MyServlet extends HttpServlet {

    public void init() throws ServletException {
        System.out.println("Servlet initializing...");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("Welcome to MyServlet!");
    }

    private boolean isRequestValid(HttpServletRequest request) {
        String userSession = request.getParameter("session");
        return userSession != null && userSession.equals("validSession");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String xmlInput = request.getReader().readLine();

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.parse(new InputSource(new StringReader(xmlInput)));
        NodeList items = document.getElementsByTagName("item");

        if (items.getLength() == 0) {
            return;
        }

        Element item = (Element) items.item(0);
        String favourite = item.getTextContent();
        addToFavorites(favourite);
        response.getWriter().printf("Favourite %s saved", favourite);
    }

}
