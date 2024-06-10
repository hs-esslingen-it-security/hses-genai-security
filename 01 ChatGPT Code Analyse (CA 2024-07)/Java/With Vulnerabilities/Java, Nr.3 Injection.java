<%@page import="java.util.List"%>
<%@page import="java.io.IOException"%>
<%@page import="javax.servlet.ServletException"%>
<%@page import="javax.servlet.http.HttpServlet"%>
<%@page import="javax.servlet.http.HttpServletRequest"%>
<%@page import="javax.servlet.http.HttpServletResponse"%>
<%@page import="javax.servlet.annotation.WebServlet"%>
<%@page import="java.io.File"%>
<%@page import="java.util.Date"%>
<%@page import="java.nio.file.Files"%>
<%@page import="java.nio.file.Paths"%>
<%@page import="java.nio.file.Path"%>

<html>
<head><title>My Application</title></head>
<body>
<%
  String appPath = getServletContext().getRealPath("");
  String configFile = appPath + File.separator + "config.ini";
  Path configFilePath = Paths.get(configFile);
  if (Files.exists(configFilePath)) {
      List<String> configLines = Files.readAllLines(configFilePath);
      out.println("<h3>Configurations:</h3><ul>");
      for(String line: configLines) {
          out.println("<li>" + line + "</li>");
      }
      out.println("</ul>");
  }

  out.println("<h2>System Information</h2>");
  out.println("<p>Current system time: " + new Date().toString() + "</p>");
  out.println("<p>Operating System: " + System.getProperty("os.name") + "</p>");
  out.println("<p>Java Version: " + System.getProperty("java.version") + "</p>");

  String fileUploadPath = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\ROOT\\uploads";
  String fileName = "";
  for (Part part : request.getParts()) {
    fileName = "unknown";
    String contentDisp = part.getHeader("content-disposition");
    String[] items = contentDisp.split(";");
    for (String s : items) {
      if (s.trim().startsWith("filename")) {
        fileName = s.substring(s.indexOf("=") + 2, s.length()-1);
      }
    }
    part.write(fileUploadPath + File.separator + fileName);
  }
  String message = fileName + " uploaded at "+ fileUploadPath + " successfully!";

  out.println("<h2>Upload Information</h2>");
  out.println("<p>" + message + "</p>");
%>
</body>
</html>

