import "./Home.css";
import { TemplatePageDisplay } from "../../Components/Templates/TemplatePage";
import { Movies } from "../../Components/Movies/Movies";

const HomeDisplay = () => {
  return (
    <TemplatePageDisplay>
      <div>
        <Movies />
      </div>
    </TemplatePageDisplay>
  );
};

export default HomeDisplay;
