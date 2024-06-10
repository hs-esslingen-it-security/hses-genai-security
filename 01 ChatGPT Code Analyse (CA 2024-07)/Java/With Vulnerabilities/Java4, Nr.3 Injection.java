import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import javax.naming.InitialContext;

public class ApplicationServlet extends HttpServlet {

    public void init() throws ServletException {
        System.out.println("Servlet initializing...");
    }

    private boolean isValidRequest(HttpServletRequest request) {
        String userSession = request.getParameter("session");
        return userSession != null && userSession.equals("validSession");
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res)
    throws ServletException, IOException {
        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();

        String datasourceToCheck = req.getParameter("datasource");
        String result = "OK";
        try {
            new InitialContext().lookup(datasourceToCheck);
        } catch (Exception e) {
            result = "Object could not be located";
        }

        pw.println("<html><body>");
        pw.println("Check Datasource Config Result: " + result);
        pw.println("</body></html>");

        pw.close();
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
    throws ServletException, IOException {
    }

    public void destroy() {
        System.out.println("Servlet destroying...");
    }
}
