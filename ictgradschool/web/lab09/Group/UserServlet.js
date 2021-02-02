
@WebServlet(urlPatterns = "/addUserServlet")
public class AddUserServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    doGet(request, response);
}

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    //get data
    String name = request.getParameter("name");

    String age = request.getParameter("age");

    //deal with data
    User user = new User(null, name, sex, Integer.parseInt(age), address, qq, email);
    UserService userService = new UserService();
    boolean isAdd = userService.addUser(user);
    if (isAdd) {
        //add successful ,check all information
        response.sendRedirect("/pageQueryServlet?pageNum=" + pageNum + "&pageSize=" + pageSize);
    } else {
        //add unsuccessful, jump info fail page
        request.setAttribute("errorMsg", "signup unsuccessfully！");
        request.getRequestDispatcher("/error.jsp").forward(request, response);
    }
}
}