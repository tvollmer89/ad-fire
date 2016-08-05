@inherits Umbraco.Web.Mvc.UmbracoTemplatePage
@using Archetype.Models;
@using Archetype.Extensions;
  @{
    var home = CurrentPage.AncestorOrSelf("Home");
    var logoImage = Umbraco.Media(home.logoImage);
    var boxes = Model.Content.GetPropertyValue<ArchetypeModel>("multiText");
    var slides = Model.Content.GetPropertyValue<ArchetypeModel>("slider");

    <div id="homeSlide">
      <div class="slideshow">
        @foreach (var slide in slides)
        {
          var slideImage = Umbraco.Media(slide.GetValue("slidePhoto"));
          <div class="slideImg">
            @if(@slide.HasValue("caseHistory"))
            {
              var slideLink = Umbraco.Media(slide.GetValue("caseHistory"));
              <a href="@slideLink.url" target="_blank"><img src="@slideImage.Url"></a>
            }
            else
            {
              <img src="@slideImage.Url">
            }
            <section class="white-section">
              <div class="row">
                <section class="clearfix">
                  <div class="box-logo">
                    <img src="@logoImage.Url" class="box-logo-img"/>
                  </div>
                  <div class="box-text">
                    <h1>@home.logoText</h1>
                  </div>
                </section>
               </div>
              <div class="row">
                <ul>
                  @foreach (var box in boxes)
                  {
                    if (box.HasValue("text"))
                    {
                      <li class="bold-links">@Html.Raw(box.GetValue("text"))</li>
                    }
                  }
                </ul>
              </div>
            </section>
          </div>
        }
      </div>
    </div>

  }